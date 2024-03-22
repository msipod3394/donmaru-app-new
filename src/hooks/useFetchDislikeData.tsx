import { useState, useEffect } from 'react'
import { getAllDislike } from '@/hooks/supabaseFunctions'
import { convertFormattedDate } from '@/hooks/convertFormattedDate'

export function useFetchDislikeData(userId: string) {
  // ローディング
  const [loading, setLoading] = useState(false)

  // 苦手ネタデータ管理
  const [dislike, setDislike] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ローディング開始
        setLoading(true)

        // データ取得
        const [getFetchData] = await Promise.all([getAllDislike(userId)])

        // ステート更新
        setDislike(getFetchData)

        // ローディング解除
        setLoading(false)
      } catch (error) {
        console.error('エラーが発生しました', error)
        setLoading(false)
      }
    }

    fetchData() // 関数実行
  }, [userId])

  return { loading, dislike }
}
