// 丼カードに注文回数・最新注文日を入れた配列に整形する

import { useEffect, useState } from 'react'
import { convertFormattedDate } from '@/hooks/convertFormattedDate'

type Props = {
  id: number
  title: string
  image: string
  created_at: string
  updated_at: string
  don_id: number
}

export const ItemCardConvert = (items: Props[]) => {
  // 注文履歴データ管理
  const [orderDons, setOrderDons] = useState<Props[]>([])

  useEffect(() => {
    // 取得したデータに注文回数を追加
    const idCounts: Record<number, number> = {}
    items.forEach((item) => {
      const id = item.don_id
      idCounts[id] = (idCounts[id] || 0) + 1
    })

    const itemsAddCount = items.map((item) => {
      const id = item.don_id
      const count = idCounts[id]
      return { ...item, count }
    })

    // 最新の注文日を取得
    const latestItemsMap = new Map()
    itemsAddCount.forEach((item) => {
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
  }, [items])

  return orderDons
}
