import { useState, useEffect } from 'react'
import { getAllFavorite } from '@/hooks/supabaseFunctions'
import { convertFormattedDate } from '@/hooks/convertFormattedDate'

export function useFetchFavoriteData(userId: string) {
  // ローディング
  const [loading, setLoading] = useState(false)

  // お気に入りデータ管理
  const [favoriteDons, setFavoriteDons] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ローディング開始
        setLoading(true)

        // データ取得
        const [getFetchData] = await Promise.all([getAllFavorite(userId)])

        // 注文回数を数える
        const idCounts = {}
        getFetchData.forEach((item) => {
          const id = item.don_id
          idCounts[id] = (idCounts[id] || 0) + 1
        })

        // 取得したデータに注文回数を追加
        const getFetchDataAddCount = getFetchData.map((item) => {
          const id = item.don_id
          const count = idCounts[id]
          return { ...item, count }
        })

        // 更新日時をフォーマット
        const latestItemsMap = new Map()
        getFetchDataAddCount.forEach((item) => {
          const existingItem = latestItemsMap.get(item.don_id)
          const formattedDate = convertFormattedDate(item.updated_at)
          item.updated_at = formattedDate
          if (
            !existingItem ||
            new Date(item.updated_at) > new Date(existingItem.updated_at)
          ) {
            latestItemsMap.set(item.don_id, item)
          }
        })

        // 最新の注文日を取得
        const latestItems = Array.from(latestItemsMap.values())

        // ステートにデータをセット
        setFavoriteDons(latestItems)

        // ローディング解除
        setLoading(false)
      } catch (error) {
        console.error('エラーが発生しました', error)
        setLoading(false)
      }
    }

    fetchData()
  }, [userId])

  return { loading, favoriteDons }
}
