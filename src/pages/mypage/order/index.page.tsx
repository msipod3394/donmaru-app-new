import { useEffect, useState } from 'react'
import { Item, useFetchOrderByIdQuery } from '@/gql/graphql'
import { useUserContext } from '@/contexts/UserContext'
import { useCheckLogin } from '@/hooks/useLoginCheck'
import { PageTitle } from '@/components/atoms/texts/PageTitle'
import { LoadingIndicator } from '@/components/atoms/LoadingIndicator'
import { ItemCardList } from './ItemCardList'

type ItemAddCount = Item & {
  count: string
}

export default function PageOrder() {
  // ユーザー情報をセット
  const [user, setUser] = useUserContext()
  const checkLogin = useCheckLogin()

  useEffect(() => {
    if (Object.keys(user).length === 0 && checkLogin !== undefined) {
      setUser(checkLogin)
    }
  }, [user, checkLogin])

  // 取得したお気に入りデータ
  const [orders, setOrders] = useState<ItemAddCount[]>([])

  // 注文履歴カウント
  const [count, setCount] = useState<{ id: string; count: number }[]>([])

  // loading状態を管理
  const [loading, setLoading] = useState(false)

  // 注文履歴の取得
  const { data: orderData } = useFetchOrderByIdQuery({
    variables: { userId: user && user.id ? String(user.id) : '' },
    skip: !user,
    onCompleted: (orderData) => {
      if (orderData) {
        console.log('orderData', orderData)
      }
    },
  })

  // 注文履歴取得後、注文回数の配列を作成
  useEffect(() => {
    if (orderData) {
      const itemIds = orderData.order.map((order) => order.item.id)
      const counts: { [key: string]: number } = {}

      // 丼IDとカウント数のみの配列を作成
      itemIds.forEach((itemId) => {
        counts[itemId] = (counts[itemId] || 0) + 1
      })

      // カウントされた結果を配列にマップ
      const countArray = Object.keys(counts).map((id) => ({ id, count: counts[id] }))
      setCount(countArray)
    }
  }, [orderData])

  useEffect(() => {
    if (orderData && count) {
      setLoading(true)

      const filterItems = orderData.order.map((order) => order)

      // 注文回数をオブジェクトにマッピング
      const countMap = count.reduce(
        (map, obj) => {
          // 注文回数を格納
          if (obj.id) {
            map[obj.id] = obj.count
          }
          return map
        },
        {} as { [key: string]: number },
      )

      // 注文回数を含めた配列を作成
      const result = filterItems.map((obj) => ({
        ...obj,
        count: countMap[obj.item.id] || 0,
      }))

      console.log('result', result)

      setOrders(result)
      setLoading(false)
    }
  }, [orderData, count])

  return (
    <>
      <PageTitle title='注文履歴' />
      {loading ? (
        <LoadingIndicator />
      ) : orders.length === 0 ? (
        <p>注文履歴はありません</p>
      ) : (
        <ItemCardList items={orders} />
      )}
    </>
  )
}
