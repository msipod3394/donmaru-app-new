import { useEffect, useState } from 'react'
import { useUserContext } from '@/contexts/UserContext'
import { Order, useFetchItemsQuery, useFetchOrderByIdQuery } from '@/gql/graphql'
import { PageTitle } from '@/components/atoms/texts/PageTitle'
import { LoadingIndicator } from '@/components/atoms/LoadingIndicator'
import { ItemCardList } from '@/components/molecules/ItemCardList'
import { ItemWithCount } from '@/types/ItemWithCount'

export default function PageAllMenu() {
  // 全ての丼を取得
  const { data } = useFetchItemsQuery()

  // データ
  const [items, setItems] = useState<ItemWithCount[]>([])

  // ユーザー情報をセット
  const [user] = useUserContext()

  // 注文履歴カウント
  const [count, setCount] = useState<
    {
      id: string
      count: number
      createdAt: string
    }[]
  >([])
  const [orders, setOrders] = useState<Order[]>([])

  // loading状態を管理
  const [loading, setLoading] = useState(false)

  // 注文履歴の取得
  const { data: orderData } = useFetchOrderByIdQuery({
    variables: { userId: user && user.id ? String(user.id) : '' },
    skip: !user,
    onCompleted: (orderData) => {
      if (orderData && orderData.order) {
        setOrders(orderData.order)
      }
    },
  })

  // 注文履歴取得後、注文回数の配列を作成
  useEffect(() => {
    if (orders) {
      const counts: { [key: string]: { count: number; createdAt: string } } = {}

      // 各注文ごとに処理
      orders.forEach((order) => {
        const itemId = order.item.id
        // カウントを更新
        counts[itemId] = {
          count: (counts[itemId]?.count || 0) + 1,
          createdAt: order.createdAt, // createdAtを追加
        }
      })

      // カウントされた結果を配列にマップ
      const countArray = Object.keys(counts).map((id) => ({
        id,
        count: counts[id].count,
        createdAt: counts[id].createdAt,
      }))

      setCount(countArray)
    }
  }, [orders])

  // データとカウントが取得された後に実行
  useEffect(() => {
    if (data && count && orders) {
      // ローディング開始
      setLoading(true)

      // 注文回数をオブジェクトにマッピング
      const countMap = count.reduce(
        (map, obj) => {
          if (obj.id) {
            map[obj.id] = {
              count: obj.count,
              latest: obj.createdAt,
            }
          }
          return map
        },
        {} as { [key: string]: { count: number; latest: string } },
      )

      // 商品データと注文回数、作成日時を組み合わせた配列を作成
      const result = data.items.map((item) => ({
        ...item,
        count: countMap[item.id] ? countMap[item.id].count : 0,
        latest: countMap[item.id] ? countMap[item.id].latest : '',
      }))

      // console.log('result', result)

      // データをセット
      setItems(result)

      // ローディング解除
      setLoading(false)
    }
  }, [data, count, orders, setOrders])

  return (
    <>
      <PageTitle title='メニュー一覧' />
      {loading ? <LoadingIndicator /> : <>{items && <ItemCardList items={items} />}</>}
    </>
  )
}
