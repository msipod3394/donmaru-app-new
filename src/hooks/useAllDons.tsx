import { useAppContext } from '@/contexts/AppContext'
import { getAllDons } from '@/hooks/supabaseFunctions'
import { useEffect, useState } from 'react'

// 商品情報を取得するためのHook
export function useAllDons() {
  const [fetchDons, setFetchDons] = useAppContext()

  const fetchDataDons = async () => {
    try {
      const [allDons] = await Promise.all([getAllDons()])
      setFetchDons(allDons)
    } catch (error) {
      console.error('エラーが発生しました', error)
    }
  }

  useEffect(() => {
    fetchDataDons()
  }, [])

  return { fetchDons }
}
