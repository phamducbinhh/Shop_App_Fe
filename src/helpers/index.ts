export const isObjectEmpty = (obj: Record<string, any>) => {
  return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
};

export const checkJSONchecker = (str: string) => {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
};

export const formatSubString = (name: string) => {
  if (name && name.length > 12) {
    return `${name.substring(0, 12)}...`;
  }
  return name;
};

export const encodeToBase64 = (code: string | any) => {
  return btoa(code);
};

export const decodeFromBase64 = (code: string | null): string | null => {
  if (!code) {
    console.error("Failed to decode Base64 string: code is null or undefined");
    return null;
  }

  try {
    return atob(code);
  } catch (error) {
    console.error("Failed to decode Base64 string:", error);
    return null;
  }
};

export const generateRandomString = (length: number): string => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const removeWhitespace = (str: string | any) => {
  if (str) {
    return str.trim();
  }
};

export const normalizePath = (path: string) => {
  return path.startsWith("/") ? path.slice(1) : path;
};

export const formatPrize = (prize: number | string) => {
  if (!prize) return;
  return prize?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " VNĐ";
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `Tháng ${month.toString().padStart(2, "0")}/${year}`;
};

export const formatTime = (dateTime: string, characters = false) => {
  if (!dateTime) return;
  const date = new Date(dateTime?.replace(" ", "T"));
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  if (characters) {
    return `${hours}:${minutes}  ${day}/${month}`;
  }

  return `${hours}:${minutes} - ${day}/${month}`;
};

export const formatLastChangedTime = (date: string): string => {
  const seconds: number = Math.floor(
    (new Date().getTime() -
      new Date(Date.parse(date.replace(" ", "T"))).getTime()) /
      1000
  );
  let interval: number = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + " năm trước";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " tháng trước";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " ngày trước";
  } else if (interval === 1) {
    return "1 ngày trước";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " giờ trước";
  } else if (interval === 1) {
    return "1 giờ trước";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " phút trước";
  } else if (interval === 1) {
    return "1 phút trước";
  }
  return Math.floor(seconds) + " giây trước";
};
