import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Dislike, useFetchDislikeByIdQuery, useFetchItemsQuery } from '@/gql/graphql'
import { useUserContext } from '@/contexts/UserContext'

export default function PageSelectOmakase() {
  const router = useRouter()

  // ユーザー情報をセット
  const [user] = useUserContext()

  // 苦手ネタをステート管理
  const [dislikes, setDislikes] = useState<Dislike[]>([])

  // 全ての丼データ取得
  const { data } = useFetchItemsQuery()

  // 苦手ネタを取得
  const { data: dislikesData, refetch: refetchDislikesByUserId } =
    useFetchDislikeByIdQuery({
      variables: { id: user && user.id ? user.id.toString() : undefined },
      skip: !user,
      onCompleted: (dislikesData) => {
        if (dislikesData && dislikesData.dislikes) {
          setDislikes(dislikesData.dislikes)
        }
      },
    })

  // データが取得された後に実行
  useEffect(() => {
    if (data && dislikes) {
      const dislikeIds = dislikes.map((dislike) => dislike.ingredient.id)
      // console.log('dislikeIds', dislikeIds)

      // 全ての丼データ取得
      const itemsAll = data.items

      // 苦手ネタをフィルタリング
      const filterItems = itemsAll.filter(
        (item) =>
          !item.ingredients.some((ingredient) => dislikeIds.includes(ingredient.id)),
      )
      // console.log('filterItems', filterItems)

      // ランダムに1つ選択する
      const shuffleID = Math.floor(Math.random() * filterItems.length)

      // アイテムのIDを取得
      const resultID = filterItems[shuffleID].id

      // 結果画面へ遷移
      router.push(`/select/result/${resultID}`)
    }
  }, [data, dislikes])

  return null
}
