import { useEffect, useState } from 'react'
import { getAllDons, getAllFavoriteDons, getAllOrder } from './supabaseFunctions'
import { useUserContext } from '@/contexts/UserContext'
import { convertFormattedDate } from './convertFormattedDate'

// Donsデータを取得するためのHook
export function useAllOrderDons({ user_id }) {
  // ユーザー情報
  const [user, setUser] = useUserContext()

  // 注文履歴
  const [fetchAllOrderDons, setFetchAllOrderDons] = useState([])

  // 初回読み込み時
  const fetchData = async () => {
    try {
      // 全ての丼データを取得
      const [allOrder] = await Promise.all([
        getAllOrder('e0b1fcc2-6d93-4b03-aab1-f709e6782f6b'),
      ])

      // 注文履歴
      // カウント数を取得・更新
      const donIdCounts = {}
      allOrder.forEach((order) => {
        const donId = order.don_id
        donIdCounts[donId] = (donIdCounts[donId] || 0) + 1
      })

      const allOrderAddCount = allOrder.map((order) => {
        const donId = order.don_id
        const count = donIdCounts[donId]
        return { ...order, count }
      })

      // 最新の注文データだけにソート
      const latestOrdersMap = new Map()
      allOrderAddCount.forEach((order) => {
        const existingOrder = latestOrdersMap.get(order.don_id)
        const formattedDate = convertFormattedDate(order.updated_at)
        order.updated_at = formattedDate
        if (
          !existingOrder ||
          new Date(order.updated_at) > new Date(existingOrder.updated_at)
        ) {
          latestOrdersMap.set(order.don_id, order)
        }
      })

      const latestOrders = Array.from(latestOrdersMap.values())
      // console.log("latestOrders", latestOrders);
      setFetchAllOrderDons(latestOrders)
    } catch (error) {
      console.error('エラーが発生しました', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return { fetchAllOrderDons }
}
