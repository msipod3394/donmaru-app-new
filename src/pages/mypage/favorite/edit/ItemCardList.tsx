import React, { useEffect, useState } from 'react'
import { useFetchOrders } from '@/hooks/fetch/useFetchOrders'
import { convertFormattedDate } from '@/hooks/convertFormattedDate'
import { ItemCard } from './ItemCard'
import { useFetchFavorites } from '@/hooks/fetch/useFetchFavorites'

type Props = {
  id: number
  title: string
  image: string
  created_at: string
  updated_at: string
  don_id: number
  order_latest: string
  count: number
  favorite: boolean
}

type FilterData = {
  don_id: number
  updated_at: string
  count: number
}

export function ItemCardList({ items }: { items: Props[] }) {
  // 履歴の情報取得
  const { fetchOrders } = useFetchOrders()

  // お気に入り丼の情報取得
  const { fetchFavorites } = useFetchFavorites()

  // 最新の注文履歴ステート
  const [order, setOrder] = useState<FilterData[]>([])

  // 最終的にItemCardに送るオブジェクト
  const [endItem, setEndItem] = useState<Props[]>([])

  // 履歴の重複チェック・注文回数を取得
  useEffect(() => {
    const filterArray: FilterData[] = []

    fetchOrders.forEach((item) => {
      // id, 最終注文日を抽出
      const { don_id, updated_at } = item

      // 重複した場合の状態を返す
      const existingItemIndex = filterArray.findIndex(
        (filterItem) => filterItem.don_id === don_id,
      )
      // console.log(item.id, existingItemIndex)

      // 注文回数をセット
      if (existingItemIndex === -1) {
        // 重複がない場合、1でセット
        filterArray.push({ don_id, updated_at, count: 1 })
      } else {
        // 重複がある場合、countをインクリメント
        filterArray[existingItemIndex].count++
      }
    })

    setOrder(filterArray)
  }, [fetchOrders])

  useEffect(() => {
    // 注文履歴のIDだけの配列を作成
    const orderIdArray = order.map((item) => item.don_id)

    // お気に入りのIDだけの配列を作成
    const favDonIdArray = fetchFavorites.map((item) => item.don_id)

    // 全丼から注文履歴に一致する丼を検索
    const targetItems = items.map((item) => {
      // 初期値
      let order_latest = ''
      let count = 0
      let favorite

      if (orderIdArray.includes(item.id)) {
        const targetId = item.id
        const targetItem = order.find((item) => item.don_id === targetId)
        // 該当すれば、最新注文日・注文回数を追加
        if (targetItem) {
          order_latest = convertFormattedDate(targetItem.updated_at)
          count = targetItem.count
        }
      }

      // お気に入りのプロパティ更新
      if (favDonIdArray.includes(item.id)) {
        favorite = true
      } else {
        favorite = false
      }

      return { ...item, order_latest, count, favorite }
    })

    // console.log(targetItems)
    setEndItem(targetItems)
  }, [items, order, fetchFavorites])

  return (
    <>
      {endItem.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </>
  )
}
