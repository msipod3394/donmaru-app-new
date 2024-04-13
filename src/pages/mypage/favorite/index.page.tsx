import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Text } from '@chakra-ui/react'
import {
  useFetchFavoriteByEmailQuery,
  useSearchOrderByUserEmailQuery,
} from '@/gql/graphql'
import { useUserContext } from '@/contexts/UserContext'
import { ButtonRounded } from '@/components/atoms/buttons/ButtonRounded'
import { PageTitle } from '@/components/atoms/texts/PageTitle'
import { LoadingIndicator } from '@/components/atoms/LoadingIndicator'
import { ItemCardList } from '@/components/molecules/ItemCardList'
import { ItemWithCount } from '@/types/ItemWithCount'

export default function PageFavorite() {
  const router = useRouter()

  // ユーザー情報を取得
  const [user, setUser] = useUserContext()

  // 取得したお気に入りデータ
  const [favorites, setFavorites] = useState<ItemWithCount[]>([])

  // 注文履歴カウント
  const [count, setCount] = useState<{ id: string; count: number }[]>([])

  // loading状態を管理
  const [loading, setLoading] = useState(false)

  // お気に入り情報の取得
  const { data } = useFetchFavoriteByEmailQuery({
    variables: { email: user && user.email ? user.email : null },
    skip: !user,
    // onCompleted: () => setLoading(false),
  })

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
      setLoading(true)
      const filterItems = data.favorites.map((favorite) => favorite.item)

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
        count: countMap[obj.id] || 0,
      }))

      setFavorites(result)
      setLoading(false)
    }
  }, [data, count, setFavorites])

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
