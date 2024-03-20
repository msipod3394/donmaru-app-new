import { createContext, ReactNode, useContext, useState } from 'react'
import { DBUser } from '@/types/global_db.types'

const UserContext = createContext([])

// DBUser 初期値
const initialUser: DBUser = {
  created_at: '',
  email: '',
  id: '',
  password: '',
  updated_at: '',
  user_name: '',
}

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<DBUser>(initialUser)

  return <UserContext.Provider value={[user, setUser]}>{children}</UserContext.Provider>
}

// コンテキストを利用するためのカスタムフック
const useUserContext = () => useContext(UserContext)
export { UserProvider, useUserContext }


