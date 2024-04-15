import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react'
import { User } from '@/gql/graphql'

const userContext = createContext<[User, Dispatch<SetStateAction<User>>]>([
  {} as User,
  () => {},
])

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>({} as User)

  return <userContext.Provider value={[user, setUser]}>{children}</userContext.Provider>
}

// コンテキストを利用するためのカスタムフック
const useUserContext = () => useContext(userContext)
export { UserProvider, useUserContext }
