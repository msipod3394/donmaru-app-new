// Hooks: 注文履歴を取得
import { useState, useEffect } from 'react'
import { getAllOrder } from '@/hooks/supabaseFunctions'
import { convertFormattedDate } from '@/hooks/convertFormattedDate'

export function useOrderData(userId: string) {
  // ローディング
  const [loading, setLoading] = useState(false)

  // 注文履歴データ管理
  const [orderDons, setOrderDons] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ローディング開始
        setLoading(true)

        // データ取得
        const [getFetchData] = await Promise.all([getAllOrder(userId)])

        // 取得したデータに注文回数を追加
        const idCounts = {}
        getFetchData.forEach((item) => {
          const id = item.don_id
          idCounts[id] = (idCounts[id] || 0) + 1
        })

        // 更新日時をフォーマット
        const getFetchDataAddCount = getFetchData.map((item) => {
          const id = item.don_id
          const count = idCounts[id]
          return { ...item, count }
        })

        // 最新の注文日を取得
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
        const latestItems = Array.from(latestItemsMap.values())

        // ステートにデータをセット
        setOrderDons(latestItems)

        // ローディング解除
        setLoading(false)
      } catch (error) {
        console.error('エラーが発生しました', error)
        setLoading(false)
      }
    }

    fetchData() // 関数実行
  }, [userId])

  return { loading, orderDons }
}
