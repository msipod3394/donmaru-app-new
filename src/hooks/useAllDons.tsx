// 使わない

import { getAllDons } from '@/hooks/supabaseFunctions'
import { useEffect, useState } from 'react'

// Donsデータを取得するためのHook
export function useAllDons() {
  const [fetchDonsData, setFetchDonsData] = useState(null)

  // 初回読み込み時
  const fetchData = async () => {
    try {
      const allDons = await getAllDons()
      setFetchDonsData(allDons)
    } catch (error) {
      console.error('エラーが発生しました', error)
    }
  }

  // fetchData()

  return { fetchData }
}
