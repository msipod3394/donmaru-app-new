import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useGetItemsQuery } from '@/gql/graphql'

export default function PageSelectOmakase() {
  const router = useRouter()

  // 全ての丼データ取得
  const { data } = useGetItemsQuery()

  // データが取得された後に実行
  useEffect(() => {
    if (data) {
      // 全ての丼データ取得
      const itemsAll = data.items

      // ランダムに1つ選択する
      const shuffleID = Math.floor(Math.random() * itemsAll.length)

      // アイテムのIDを取得
      const resultID = itemsAll[shuffleID].id

      // 結果画面へ遷移
      router.push(`/select/result/${resultID}`)
    }
  }, [data])

  return null
}
