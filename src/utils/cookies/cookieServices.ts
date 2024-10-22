export class useCookieServices {
  static setCookie(
    name: string,
    value: string,
    daysToExpire: number,
    sameSite: 'Strict' | 'Lax' | 'None' = 'Strict'
  ): void {
    const expirationDate = new Date()
    expirationDate.setDate(expirationDate.getDate() + daysToExpire)

    const cookieString = `${name}=${encodeURIComponent(
      value
    )};expires=${expirationDate.toUTCString()};path=/;SameSite=${sameSite}`

    document.cookie = cookieString
  }

  static getCookie(name: string): string | null {
    const cookies = document.cookie.split(';').map((cookie) => cookie.trim())

    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split('=')
      if (cookieName === name) {
        return decodeURIComponent(cookieValue)
      }
    }

    return null
  }

  static removeCookie(name: string): void {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`
  }

  static clearAllCookies(): void {
    const cookies = document.cookie.split(';')

    for (const cookie of cookies) {
      const [cookieName] = cookie.split('=')
      this.removeCookie(cookieName)
    }
  }
}
