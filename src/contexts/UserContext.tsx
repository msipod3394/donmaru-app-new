import React, { createContext, ReactNode, useContext, useState } from 'react'
import { DBUser } from '@/types/global_db.types'

const UserContext = createContext<
  [DBUser | undefined, React.Dispatch<React.SetStateAction<DBUser | undefined>>]
>([undefined, () => undefined])

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<DBUser>()

  return <UserContext.Provider value={[user, setUser]}>{children}</UserContext.Provider>
}

// コンテキストを利用するためのカスタムフック
const useUserContext = () => useContext(UserContext)
export { UserProvider, useUserContext }
