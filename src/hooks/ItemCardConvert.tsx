// 丼カードに注文回数・最新注文日を入れた配列に整形する

import { useEffect, useState } from 'react'
import { convertFormattedDate } from '@/hooks/convertFormattedDate'
import { Item, Scalars, useFetchOrderByEmailQuery, User } from '@/gql/graphql'
import { useCheckLogin } from './useLoginCheck'

type Props = {
  id: string
  item: Item
  user: User
  count: number
  updatedAt: Scalars['ISO8601DateTime']['output']
}

export const ItemCardConvert = (items: Item[]) => {
  // お気に入り丼ステート
  const [favorites, setFavorites] = useState<Props[]>([])

  // 返却するデータのステート
  const [returnDons, setReturnDons] = useState<Props[]>([])

  // ユーザー情報を取得
  const { getUser } = useCheckLogin()
  const [user, setUser] = useState<User>()

  // ユーザー情報を取得実行
  useEffect(() => {
    setUser(getUser)
  }, [getUser])

  // 注文履歴を取得
  const {
    data: fetchOrder,
    loading,
    refetch: refetchOrderByUserEmail,
  } = useFetchOrderByEmailQuery({
    variables: { email: user && user.email ? user.email : null },
    skip: !user,
  })

  useEffect(() => {
    if (fetchOrder) {
      const filterItems = fetchOrder.order.map((order) => order.item.id)
      setFavorites(filterItems)
    }
  }, [fetchOrder])

  useEffect(() => {
    // 取得したデータに注文回数を追加
    const idCounts: Record<string, number> = {}

    if (items && favorites) {
      items = items.map((item) => {
        return { ...item, count: 0 }
      })

      favorites.forEach((value) => {
        const matchingItemIndex = items.findIndex((item) => item && item.id == value)
        if (matchingItemIndex !== -1) {
          // マッチしたアイテムを処理
          const matchingItem = items[matchingItemIndex]
          if (!matchingItem.count) {
            matchingItem.count = 1
          } else {
            matchingItem.count++
          }
        }
      })
    }

    // 最新の注文日を取得
    const latestItemsMap = new Map()
    items.forEach((item) => {
      const existingItem = latestItemsMap.get(item.id)
      const formattedDate = convertFormattedDate(item.updatedAt)
      item.updatedAt = formattedDate

      if (!existingItem || new Date(item.updatedAt) > new Date(existingItem.updatedAt)) {
        latestItemsMap.set(item.id, item)
      }
    })

    const latestItems = Array.from(latestItemsMap.values())
    console.log(latestItems)

    // ステートにデータをセット
    setReturnDons(latestItems)
  }, [favorites, setFavorites])

  return returnDons
}
