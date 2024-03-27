import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useFetchItems } from '@/hooks/fetch/useFetchItems'

export default function PageSelectOmakase() {
  const router = useRouter()

  // 全ての丼データ取得
  const { fetchItems, loading } = useFetchItems()
  console.log('fetchItems', fetchItems)

  // データが取得された後に実行
  useEffect(() => {
    console.log('fetchItems', fetchItems?.length)

    if (fetchItems.length > 0) {
      const shuffleID = Math.floor(Math.random() * fetchItems.length)
      console.log('shuffle', shuffleID)

      const resultID = fetchItems[shuffleID].id
      console.log('丼ID', resultID)

      // 結果画面へ遷移
      router.push(`/select/result/${resultID}`)
    }
  }, [fetchItems])

  return null
}
