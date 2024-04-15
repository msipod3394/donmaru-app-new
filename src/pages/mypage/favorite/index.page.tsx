import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Text } from '@chakra-ui/react'
import { Order, useFetchFavoriteByIdQuery, useFetchOrderByIdQuery } from '@/gql/graphql'
import { useUserContext } from '@/contexts/UserContext'
import { ButtonRounded } from '@/components/atoms/buttons/ButtonRounded'
import { PageTitle } from '@/components/atoms/texts/PageTitle'
import { LoadingIndicator } from '@/components/atoms/LoadingIndicator'
import { ItemCardList } from '@/components/molecules/ItemCardList'
import { ItemWithCount } from '@/types/ItemWithCount'
import { useCheckLogin } from '@/hooks/useLoginCheck'

export default function PageFavorite() {
  const router = useRouter()

  // ユーザー情報をセット
  const [user, setUser] = useUserContext()
  const checkLogin = useCheckLogin()

  useEffect(() => {
    if (Object.keys(user).length === 0 && checkLogin !== undefined) {
      setUser(checkLogin)
    }
  }, [user, checkLogin])

  // 取得したお気に入りデータ
  const [favorites, setFavorites] = useState<ItemWithCount[]>([])

  // 注文履歴カウント
  const [count, setCount] = useState<{ id: string; count: number }[]>([])
  const [orders, setOrders] = useState<Order[]>()

  // loading状態を管理
  const [loading, setLoading] = useState(false)

  // お気に入り情報の取得
  const { data } = useFetchFavoriteByIdQuery({
    variables: { id: user && user.id ? user.id.toString() : null },
    skip: !user,
    onCompleted: () => {
      console.log('data', data)
    },
  })

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

      console.log('countArray', countArray)

      setCount(countArray)
    }
  }, [orders])

  // データとカウントが取得された後に実行
  useEffect(() => {
    if (data && count && orders) {
      console.log('data', data)

      // ローディング開始
      setLoading(true)

      // favoritesからitemの配列を取得
      const filterItems = data.favorites.map((favorite) => favorite.item)

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

      // 注文回数を含めた配列を作成
      const result = filterItems.map((item) => ({
        ...item,
        count: countMap[item.id] ? countMap[item.id].count : 0,
        latest: countMap[item.id] ? countMap[item.id].latest : '',
      }))

      console.log('result', result)

      setFavorites(result)
      setLoading(false)
    }
  }, [count, setCount, data])

  // 編集画面へ遷移
  const clickEditFavorite = () => {
    router.push('/mypage/favorite/edit')
  }

  return (
    <>
      <PageTitle title='お気に入り管理' />
      {loading ? (
        <LoadingIndicator />
      ) : favorites.length === 0 ? (
        <Text align='center' mb='2rem'>
          お気に入り登録はありません
        </Text>
      ) : (
        <ItemCardList items={favorites} />
      )}
      <ButtonRounded onClick={clickEditFavorite} className='isDark'>
        編集する
      </ButtonRounded>
    </>
  )
}
