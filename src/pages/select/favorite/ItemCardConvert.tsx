import { useEffect, useState } from 'react'
import { convertFormattedDate } from '@/hooks/convertFormattedDate'
import { Item, Order, Scalars, User } from '@/gql/graphql'

type Props = {
  id: string
  item: Item
  user: User
  count: string
  updatedAt: Scalars['ISO8601DateTime']['output']
}

type NameToLatestOrderMap = {
  [itemName: string]: Order
}

export const ItemCardConvert = (items: Item[]) => {
  console.log('items', items)

  // 返却するデータのステート
  const [returnDons, setReturnDons] = useState<Props[]>([])

  useEffect(() => {
    const nameToLatestOrderMap: NameToLatestOrderMap = {} // 最新の注文情報

    // itemsをループして処理する
    items.forEach((item) => {
      const itemName = item.name
      const updatedAt = new Date(item.updatedAt)

      if (
        // 丼アイテムの重複がない場合、オブジェクトに追加
        !nameToLatestOrderMap[itemName] ||
        updatedAt > new Date(nameToLatestOrderMap[itemName].updatedAt)
      ) {
        nameToLatestOrderMap[itemName] = item
      }
    })

    // console.log('nameToLatestOrderMap', nameToLatestOrderMap)
    // console.log('nameCountMap', nameCountMap)

    // カウント情報と合わせる
    const newArray = Object.values(nameToLatestOrderMap).map((item) => {
      const newItem = { ...item } as {
        __typename?: 'Order' | undefined
        createdAt: any
        id: string
        item: Item
        updatedAt: any
        user: User
      }
      newItem.updatedAt = convertFormattedDate(item.updatedAt)
      return newItem
    })

    // console.log(newArray)

    // データをセット
    setReturnDons(newArray)
  }, [])

  return returnDons
}
