import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useGetItemsQuery } from '@/gql/graphql'

export default function PageSelectOmakase() {
  const router = useRouter()

  // 全ての丼データ取得
  const { data, loading, error } = useGetItemsQuery()

  // データが取得された後に実行
  useEffect(() => {
    if (data) {
      console.log('data', data.items)
      const itemsAll = data.items

      const shuffleID = Math.floor(Math.random() * itemsAll.length)
      console.log('shuffle', shuffleID)

      const resultID = itemsAll[shuffleID].id
      console.log('丼ID', resultID)

      // 結果画面へ遷移
      router.push(`/select/result/${resultID}`)
    }
  }, [data])

  return null
}
