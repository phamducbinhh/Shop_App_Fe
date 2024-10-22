export const APP_API_ENDPOINT = Object.freeze({
  AUTH: {
    LOGIN: "/login",
    REGISTER: "/register",
    LOGIN_GOOGLE: "/login/google",
    LOGIN_FACEBOOK: "/login/facebook",
    VERIFY_TOKEN: "/verify",
    VERIFY_ROUTE: "/api/auth/verify",
    LOG_OUT: "/logout",
  },
  GAME: {
    BANNER: ({
      position,
      site,
      limit,
    }: {
      position: number;
      site: number;
      limit: number;
    }) => `/banner?position=${position}&site=${site}&limit=${limit}`,
    LIST_GAME: ({
      platform,
      is_highlight,
      page,
      limit,
    }: {
      platform?: string | null;
      is_highlight?: number | null;
      page?: number | null;
      limit?: number | null;
    }): string => {
      let params = "";
      if (platform != null) {
        params += `platform=${platform}`;
      }
      if (is_highlight != null) {
        params += `${params ? "&" : ""}is_highlight=${is_highlight}`;
      }
      if (page != null) {
        params += `${params ? "&" : ""}page=${page}`;
      }
      if (limit != null) {
        params += `${params ? "&" : ""}limit=${limit}`;
      }
      return `/game${params ? `?${params}` : ""}`;
    },
    DETAILS_GAME: ({ gameSlug }: { gameSlug: string }) => `/game/${gameSlug}`,
    UNPROCESS_PAYMENT: "/order/cancel",
    CHECKOUT: "/order/checkout",
    DETAILS_ORDER: ({ orderCode }: { orderCode: string | number }) =>
      `/order/${orderCode}`,
    S_ORDER: ({ orderCode }: { orderCode: string | number | null }) =>
      `/api/transaction/${orderCode}`,
  },
  SPACE: {
    NEWS: ({
      cate_sort,
      limit,
    }: {
      cate_sort: number | string;
      limit: number;
    }) => {
      const queryParams: string[] = [];

      if (cate_sort !== null && cate_sort !== undefined) {
        queryParams.push(`cate_sort=${cate_sort}`);
      }
      if (limit !== null && limit !== undefined) {
        queryParams.push(`limit=${limit}`);
      }

      return `/news?${queryParams.join("&")}`;
    },
  },
});
