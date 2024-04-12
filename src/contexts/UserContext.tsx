import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react'
import { User } from '@/gql/graphql'

const userContext = createContext<
  [User | undefined, Dispatch<SetStateAction<User | undefined>> | undefined]
>([undefined, undefined])

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | undefined>(undefined)

  // console.log('user', user)

  return <userContext.Provider value={[user, setUser]}>{children}</userContext.Provider>
}

// コンテキストを利用するためのカスタムフック
const useUserContext = () => useContext(userContext)
export { UserProvider, useUserContext }
