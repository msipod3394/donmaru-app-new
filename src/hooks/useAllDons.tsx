import { getAllDons } from '@/hooks/supabaseFunctions'
import { useEffect, useState } from 'react'

// Donsデータを取得するためのHook
export function useAllDons() {
  const [fetchDonsData, setFetchDonsData] = useState(null)

  useEffect(() => {
    const fetchDataDons = async () => {
      try {
        const [allDons] = await Promise.all([getAllDons()])
        setFetchDonsData(allDons)
      } catch (error) {
        console.error('エラーが発生しました', error)
      }
    }

    fetchDataDons()
  }, [])

  return { fetchDonsData } // 取得したDonsデータを返す
}
