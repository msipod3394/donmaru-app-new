import { useEffect, useState } from 'react'
import { useFetchOrders } from '@/hooks/fetch/useFetchOrders'

type FilterData = {
  don_id: number
  updated_at: string
  count: number
}

// 履歴を取得するカスタムフック
export const useFetchOrdersData = () => {
  // 管理するステート
  const [order, setOrder] = useState<FilterData[]>([])

  // 全ての履歴を取得
  const { fetchOrders } = useFetchOrders()

  useEffect(() => {
    const filterArray: FilterData[] = []

    fetchOrders.forEach((item) => {
      // 丼のIDと更新日だけを抽出
      const { don_id, updated_at } = item

      // 重複チェック
      const existingItemIndex = filterArray.findIndex(
        (filterItem) => filterItem.don_id === don_id,
      )

      // 重複があったらカウント、なければ 1を返す
      if (existingItemIndex === -1) {
        filterArray.push({ don_id, updated_at, count: 1 })
      } else {
        filterArray[existingItemIndex].count++
      }
    })

    // ステートにセット
    setOrder(filterArray)
  }, [fetchOrders])

  return order
}
