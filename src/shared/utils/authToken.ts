const  key = "authToken"

export const getStoredAuthToken = () => localStorage.getItem(key)
export const storeAuthToken = (token: string) => localStorage.setItem(key, token)
export const removeStoredAuthToken = () => localStorage.removeItem(key)
