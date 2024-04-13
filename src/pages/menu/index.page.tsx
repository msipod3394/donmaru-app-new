import { useEffect, useState } from 'react'
import { useUserContext } from '@/contexts/UserContext'
import { useFetchItemsQuery, useSearchOrderByUserEmailQuery } from '@/gql/graphql'
import { PageTitle } from '@/components/atoms/texts/PageTitle'
import { LoadingIndicator } from '@/components/atoms/LoadingIndicator'
import { ItemCardList } from '@/components/molecules/ItemCardList'
import { ItemWithCount } from '@/types/ItemWithCount'

export default function PageAllMenu() {
  // 全ての丼を取得
  const { data } = useFetchItemsQuery()

  // データ
  const [items, setItems] = useState<ItemWithCount[]>([])

  // ユーザー情報を取得
  const [user, setUser] = useUserContext()

  // 注文履歴カウント
  const [count, setCount] = useState<{ id: string; count: number }[]>([])

  // loading状態を管理
  const [loading, setLoading] = useState(false)

  // 注文履歴の取得
  const { data: orderData } = useSearchOrderByUserEmailQuery({
    variables: { email: user && user.email ? user.email : null },
    skip: !user,
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

  // データとカウントが取得された後に実行
  useEffect(() => {
    if (data && count) {
      // ローディング開始
      setLoading(true)

      // 注文回数をオブジェクトにマッピング
      const filterItems = data.items.map((item) => item)
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
        count: countMap[obj.id] || 0,
      }))

      // データをセット
      setItems(result)

      // ローディング解除
      setLoading(false)
    }
  }, [data, count, setItems])

  return (
    <>
      <PageTitle title='メニュー一覧' />
      {loading ? <LoadingIndicator /> : <>{items && <ItemCardList items={items} />}</>}
    </>
  )
}
