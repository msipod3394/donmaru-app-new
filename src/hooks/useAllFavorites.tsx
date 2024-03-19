import { getAllFavoriteDons } from '@/hooks/supabaseFunctions'
import { useEffect, useState } from 'react'

// 商品情報を取得するためのHook
export function useAllFavoriteDons() {
  const [fetchFavoriteDons, setFetchFavoriteDons] = useState([])

  const fetchDataFavoriteDons = async () => {
    try {
      const [allFavoriteDons] = await Promise.all([getAllFavoriteDons()])
      setFetchFavoriteDons(allFavoriteDons)
    } catch (error) {
      console.error('エラーが発生しました', error)
    }
  }

  useEffect(() => {
    fetchDataFavoriteDons()
  }, [])

  return { fetchFavoriteDons }
}
