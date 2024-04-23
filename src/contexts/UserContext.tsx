import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useCheckLogin } from '@/hooks/useLoginCheck'
import { User } from '@/gql/graphql'

const userContext = createContext<[User, Dispatch<SetStateAction<User>>]>([
  {} as User,
  () => {},
])

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>({} as User)
  const checkLogin = useCheckLogin()

  useEffect(() => {
    if (!checkLogin) return
    setUser(checkLogin)
  }, [checkLogin])

  return <userContext.Provider value={[user, setUser]}>{children}</userContext.Provider>
}

// コンテキストを利用するためのカスタムフック
const useUserContext = () => useContext(userContext)
export { UserProvider, useUserContext }
