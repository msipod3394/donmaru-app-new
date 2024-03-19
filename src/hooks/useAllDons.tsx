import { useAppContext } from '@/contexts/AppContext'
import { getAllDons } from '@/hooks/supabaseFunctions'
import { useEffect, useState } from 'react'

// 商品情報を取得するためのHook
export function useAllDons() {
  // const [loading, setLoading] = useState(false)
  // const [dons, setDons] = useState([])
  const [dons, setDons] = useAppContext()

  const fetchData = async () => {
    try {
      // setLoading(true)
      const [allDons] = await Promise.all([getAllDons()])
      setDons(allDons)
    } catch (error) {
      console.error('エラーが発生しました', error)
    } finally {
      // setLoading(false)
    }
  }

  return { dons, fetchData }
}
