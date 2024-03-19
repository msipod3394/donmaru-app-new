import { DBDons } from '@/types/global_db.types'
import {
  createContext,
  ReactNode,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from 'react'

// コンテキストを作成
const AppContext = createContext<
  [DBDons | undefined, Dispatch<SetStateAction<DBDons | undefined>>]
>([undefined, () => {}])

// アプリケーション全体で利用する状態保持のプロバイダー
const AppProvider = ({ children }: { children: ReactNode }) => {
  // donステート
  const [dons, setDons] = useState<DBDons | undefined>()

  return (
    // AppContext.Providerを使って子コンポーネントに状態を提供
    <AppContext.Provider value={[dons, setDons]}>{children}</AppContext.Provider>
  )
}

// コンテキストを利用するためのカスタムフック
const useAppContext = () => useContext(AppContext)

export { AppProvider, useAppContext }
