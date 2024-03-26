import { DBDons } from '@/types/global_db.types'
import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from 'react'

// コンテキストを作成
type ContextType = [
  DBDons | undefined,
  Dispatch<SetStateAction<DBDons | undefined>>,
  DBDons | undefined,
  Dispatch<SetStateAction<DBDons | undefined>>,
]
const AppContext = createContext<ContextType>([undefined, () => {}, undefined, () => {}])

// アプリケーション全体で利用する状態保持のプロバイダー
const AppProvider = ({ children }: { children: ReactNode }) => {
  // donsステート
  const [dons, setDons] = useState([])
  
  // favoriteDonsステート
  const [favoriteDons, setFavoriteDons] = useState<DBDons | undefined>()

  return (
    // AppContext.Providerを使って子コンポーネントに状態を提供
    <AppContext.Provider value={[dons, setDons, favoriteDons, setFavoriteDons]}>
      {children}
    </AppContext.Provider>
  )
}

// コンテキストを利用するためのカスタムフック
const useAppContext = () => useContext(AppContext)

export { AppProvider, useAppContext }
