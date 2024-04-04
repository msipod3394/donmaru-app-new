// 丼カードに注文回数・最新注文日を入れた配列に整形する

import { useEffect, useState } from 'react'
import { convertFormattedDate } from '@/hooks/convertFormattedDate'
import { Item, Scalars, User } from '@/gql/graphql'

type Props = {
  id: string
  item: Item
  user: User
  count: number
  updatedAt: Scalars['ISO8601DateTime']['output']
}

export const ItemCardConvert = (items: Item[]) => {
  // 注文履歴データ管理
  const [orderDons, setOrderDons] = useState<Props[]>([])

  useEffect(() => {
    // 取得したデータに注文回数を追加
    const idCounts: Record<string, number> = {}

    items.forEach((item) => {
      // console.log(item)
      const id = item.id
      idCounts[id] = (idCounts[id] || 0) + 1
    })

    const itemsAddCount = items.map((item) => {
      const id = item.id
      const count = idCounts[id]
      return { ...item, count }
    })

    // 最新の注文日を取得
    const latestItemsMap = new Map()
    itemsAddCount.forEach((item) => {
      const existingItem = latestItemsMap.get(item.id)
      const formattedDate = convertFormattedDate(item.updatedAt)
      item.updatedAt = formattedDate

      if (!existingItem || new Date(item.updatedAt) > new Date(existingItem.updatedAt)) {
        latestItemsMap.set(item.id, item)
      }
    })

    const latestItems = Array.from(latestItemsMap.values())

    // ステートにデータをセット
    setOrderDons(latestItems)
  }, [items])

  return orderDons
}
