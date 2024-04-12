import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { ButtonRounded } from '@/components/atoms/buttons/ButtonRounded'
import { PageTitle } from '@/components/atoms/texts/PageTitle'
import { LoadingIndicator } from '@/components/atoms/LoadingIndicator'
import { Text } from '@chakra-ui/react'
import {
  Favorite,
  Item,
  useFetchFavoriteByEmailQuery,
  User,
  useSearchOrderByUserEmailQuery,
} from '@/gql/graphql'
import { useUserContext } from '@/contexts/UserContext'
import { ItemCardList } from './ItemCardList'

export default function PageSelectFavorite() {
  const router = useRouter()

  // ユーザー情報を取得
  const [user, setUser] = useUserContext()

  // 取得したお気に入りデータ
  const [favorites, setFavorites] = useState<Item[]>([])

  // 結果をステート管理
  const [result, setResult] = useState('')

  // 注文履歴カウント
  const [count, setCount] = useState([])

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

  // loading状態を管理
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (orderData) {
      console.log('orderData', orderData.order)

      const itemIds = orderData.order.map((order) => order.item.id)

      const counts = {}
      itemIds.forEach((itemId) => {
        counts[itemId] = (counts[itemId] || 0) + 1
      })

      // カウントされた結果を配列にマップ
      const result = Object.keys(counts).map((id) => ({ id, count: counts[id] }))
      console.log(result)

      setCount(result)
    }
  }, [orderData])

  // データが取得された後に実行
  useEffect(() => {
    if (data && count) {
      const filterItems = data.favorites.map((favorite) => favorite.item)

      const countMap = count.reduce((map, obj) => {
        map[obj.id] = obj.count
        return map
      }, {})

      const result = filterItems.map((obj) => {
        if (obj.id && countMap[obj.id]) {
          return {
            ...obj,
            count: countMap[obj.id],
          }
        } else {
          return obj
        }
      })

      setFavorites(result)
    }
  }, [data, count, setCount])

  useEffect(() => {
    if (favorites.length !== 0) {
      const shuffleID = favorites[Math.floor(Math.random() * favorites.length)]
      const favoritesID = shuffleID.id
      setResult(favoritesID)
      setLoading(false)
    }
  }, [favorites, setFavorites])

  // 結果画面へ遷移
  const clickShowResult = () => {
    router.push(`/select/result/${result}`)
  }

  return (
    <>
      <PageTitle title='お気に入りからガチャ' />
      {loading ? (
        <LoadingIndicator />
      ) : favorites.length === 0 ? (
        <>
          <Text align='center' mb='2rem'>
            お気に入り登録はありません
          </Text>
          <ButtonRounded
            onClick={() => router.push('/mypage/favorite')}
            className='isDark'
          >
            お気に入りを登録しよう
          </ButtonRounded>
        </>
      ) : (
        <>
          <ItemCardList items={favorites} />
          <ButtonRounded onClick={clickShowResult} className='isDark'>
            ガチャする
          </ButtonRounded>
        </>
      )}
    </>
  )
}
