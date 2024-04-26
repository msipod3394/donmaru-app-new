const key = 'authToken'

export const getStoredAuthToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(key)
  }
  return null
}

export const storeAuthToken = (token: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, token)
  }
}

export const removeStoredAuthToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(key)
  }
}
