import { METHOD_TYPE } from "@/configs/method";
import { normalizePath } from "@/helpers";
import { useCookieServices } from "@/utils/cookies/cookieServices";


export interface ApiResponse<T> {
  status: string;
  message?: string;
  data?: T;
}

export class ApiError extends Error {
  constructor(public status: number, message: string, public data?: any) {
    super(message);
    this.name = "ApiError";
  }
}

export class NetworkError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NetworkError";
  }
}

export class ApiClient {
  private host: string;
  private prefix: string;
  private headers: Record<string, string>;

  constructor(host: string, prefix: string = "") {
    this.host = host;
    this.prefix = prefix;
    this.headers = {
      Accept: "application/json",
      lang: "vi",
    };
  }

  private get basePath(): string {
    return this.prefix ? `${this.host}/${this.prefix}` : this.host;
  }

  private isClient(): boolean {
    return typeof window !== "undefined";
  }

  private getHeaders(config: any): Record<string, string> {
    const headers = { ...this.headers };

    const token = this.isClient() ? "" : config.token;

    if (token) {
      headers.Authorization = token;
    }

    if (config.body && config.method !== METHOD_TYPE.GET) {
      headers["Content-Type"] = "application/json";
    }

    return headers;
  }

  private async handleAuthTasks(
    path: string,
    response: Response
  ): Promise<void> {
    const normalizedPath = normalizePath(path);

    if (response.ok) {
      if (normalizedPath === "login" || normalizedPath.startsWith("login/")) {
        const { token } = await response.json();
        if (token) {
          useCookieServices.setCookie("accessToken", token, 7);
        }
      } else if (normalizedPath === "logout") {
        useCookieServices.removeCookie("accessToken");
      }
    } else if (normalizedPath === "verify") {
      useCookieServices.removeCookie("accessToken");
    }
  }

  public async Http<T>({
    path,
    config = {},
  }: {
    path: string;
    config?: any;
  }): Promise<ApiResponse<T> | Response> {
    const { method = METHOD_TYPE.GET, body, ...restConfig } = config;
    const headers = this.getHeaders(config);

    const fetchConfig: RequestInit = {
      method,
      headers,
      credentials: "include",
      body:
        method !== METHOD_TYPE.GET && body ? JSON.stringify(body) : undefined,
      cache: "no-cache" as RequestCache,
      ...restConfig,
    };

    try {
      const response = await fetch(this.basePath + path, fetchConfig);

      if (this.isClient()) {
        await this.handleAuthTasks(path, response);
      }

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new ApiError(response.status, response.statusText, errorResponse);
      }

      const normalizedPath = normalizePath(path);
      if (
        [
          "login",
          "register",
          "login/google",
          "login/facebook",
          "logout",
        ].includes(normalizedPath)
      ) {
        return response;
      }

      const data = (await response.json()) as ApiResponse<T>;

      return data;
    } catch (error: any) {
      if (error instanceof ApiError) {
        return {
          status: "error",
          message: error.message,
          data: error.data,
        };
      } else if (
        error.name === "TypeError" &&
        error.message === "Failed to fetch"
      ) {
        throw new NetworkError(
          "Network error occurred. Please check your connection."
        );
      } else {
        return {
          status: "error",
          message: error.message || "Something went wrong",
        };
      }
    }
  }
}
