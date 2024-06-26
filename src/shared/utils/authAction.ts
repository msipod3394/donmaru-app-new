import { removeStoredAuthToken, storeAuthToken } from './authToken'

export type AuthType = {
  email: string
  password: string
}

export type SignUpAuthType = AuthType & {
  passwordConfirmation: string
}

const authUrl = (path?: string) => `https://donmaru-app-d7b389e39b39.herokuapp.com/users/${path || ''}`

// SignIn
export const onSignIn = async ({ email, password }: AuthType) =>
  fetch(authUrl('sign_in'), {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: {
        email,
        password,
      },
    }),
  }).then(async (res) => {
    const token = res.headers.get('Authorization')
    if (res.ok && token) {
      storeAuthToken(token)
      const user = await res.json()
      return user
    }
    throw new Error(res.toString())
  })

// SignUp
export const onSignUp = ({ email, password }: AuthType) =>
  fetch(authUrl(), {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: {
        email,
        password,
      },
    }),
  }).then(async (res) => {
    if (res.ok) {
      const token = res.headers.get('Authorization')
      if (res.ok && token) {
        storeAuthToken(token)
        const user = await res.json()
        return user
      }
      return res.json()
    }
    throw new Error(res.toString())
  })

// SignOut
export const onSignOut = async (token: string) =>
  fetch(authUrl('sign_out'), {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  }).then((res) => {
    if (!res.ok) throw new Error(res.toString())
    removeStoredAuthToken()
  })
