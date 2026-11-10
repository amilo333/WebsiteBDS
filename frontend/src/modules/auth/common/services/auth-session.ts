import type { AuthSession } from '../types/auth'

const AUTH_SESSION_KEY = 'hovixi-auth-session'

function isBrowser() {
  return typeof window !== 'undefined'
}

export function saveAuthSession(session: AuthSession) {
  if (!isBrowser()) return

  window.sessionStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session))
}

export function clearAuthSession() {
  if (!isBrowser()) return

  window.sessionStorage.removeItem(AUTH_SESSION_KEY)
}

export function getAuthSession() {
  if (!isBrowser()) return null

  const storedSession = window.sessionStorage.getItem(AUTH_SESSION_KEY)

  if (!storedSession) return null

  try {
    const session = JSON.parse(storedSession) as AuthSession
    const refreshExpiredAt = Date.parse(session.refreshExpiredAt)

    if (
      !session.refreshToken ||
      !Number.isFinite(refreshExpiredAt) ||
      refreshExpiredAt <= Date.now()
    ) {
      clearAuthSession()
      return null
    }

    return session
  } catch {
    clearAuthSession()
    return null
  }
}

export function getAccessToken() {
  return getAuthSession()?.accessToken ?? null
}

export function getRefreshToken() {
  return getAuthSession()?.refreshToken ?? null
}

export function isAccessTokenExpired(session: AuthSession) {
  const accessExpiredAt = Date.parse(session.accessExpiredAt)
  return !session.accessToken
    || !Number.isFinite(accessExpiredAt)
    || accessExpiredAt <= Date.now()
}

export function hasAuthSession() {
  return Boolean(getAuthSession())
}
