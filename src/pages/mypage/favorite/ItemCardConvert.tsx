// 丼カードに注文回数・最新注文日を入れた配列に整形する

import { useEffect, useState } from 'react'
import { convertFormattedDate } from '@/hooks/convertFormattedDate'
import { Favorite, Item, Scalars, User } from '@/gql/graphql'

type Props = {
  id: string
  item: Item
  user: User
  count: number
  updatedAt: Scalars['ISO8601DateTime']['output']
}

type NameToLatestOrderMap = {
  [itemName: string]: Favorite
}

type NameCountMap = {
  [itemName: string]: number
}

export const ItemCardConvert = (items: Item[]) => {
  // 返却するデータのステート
  const [returnDons, setReturnDons] = useState<Props[]>([])

  useEffect(() => {
    const nameToLatestOrderMap: NameToLatestOrderMap = {} // 最新の注文情報
    const nameCountMap: NameCountMap = {} // 注文回数カウント

    // itemsをループして処理する
    items.forEach((item) => {
      console.log('item', item)

      const itemName = item.item.name
      const updatedAt = new Date(item.updatedAt)

      if (
        // 丼アイテムの重複がない場合、オブジェクトに追加
        !nameToLatestOrderMap[itemName] ||
        updatedAt > new Date(nameToLatestOrderMap[itemName].updatedAt)
      ) {
        nameToLatestOrderMap[itemName] = item
      }
      // 重複してたらカウントアップ
      if (nameCountMap[itemName]) {
        nameCountMap[itemName]++
      } else {
        nameCountMap[itemName] = 1
      }
    })

    console.log('nameToLatestOrderMap', nameToLatestOrderMap)
    console.log('nameCountMap', nameCountMap)

    // カウント情報と合わせる
    const newArray = Object.values(nameToLatestOrderMap).map((item) => {
      const newItem = { ...item } as {
        __typename?: 'Order' | undefined
        createdAt: any
        id: string
        item: Item
        updatedAt: any
        user: User
        count: number
      }
      const itemName = newItem.item.name
      newItem.count = nameCountMap[itemName]
      newItem.updatedAt = convertFormattedDate(item.updatedAt)
      return newItem
    })

    console.log('newArray', newArray)

    // データをセット
    setReturnDons(newArray)
  }, [])

  return returnDons
}
