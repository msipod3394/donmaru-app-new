import { useState, useEffect } from 'react'
import { getAllDons, getAllFavoriteDons, getAllOrder } from './supabaseFunctions'

const useFetchDonsData = () => {
  // 全ての丼
  const [dons, setDons] = useState([])

  // 初回読み込み時
  const fetchData = async () => {
    try {
      // 全ての丼データを取得
      const [allDons] = await Promise.all([getAllDons()])
      console.log('allDons', allDons)
      setDons(allDons)
    } catch (error) {
      console.error('エラーが発生しました', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    console.log('dons', dons)
  }, [dons])

  return { dons }
}

export default useFetchDonsData
