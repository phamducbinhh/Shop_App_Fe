import { checkJSONchecker } from "@/helpers"

export class useLocalStorage {
  static setLocalStorageData(key: string, value: any) {
    if (typeof value === 'object') {
      return localStorage.setItem(key, JSON.stringify(value))
    } else {
      return localStorage.setItem(key, value)
    }
  }

  static getLocalStorageData(key: string, defaultValue: any = null) {
    const storedValue: any = localStorage.getItem(key)
    return storedValue !== null ? (checkJSONchecker(storedValue) ? JSON.parse(storedValue) : storedValue) : defaultValue
  }

  static removeLocalStorageData(key: string) {
    return localStorage.removeItem(key)
  }
}
