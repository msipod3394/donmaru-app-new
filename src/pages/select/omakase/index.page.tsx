import { useLoadingState } from '@/hooks/useLoadingState'
import { useAllDons } from '@/hooks/useAllDons'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAppContext } from '@/contexts/AppContext'

export default function OmakasePage() {
  const loading = useLoadingState()
  const router = useRouter()

  // 全丼データ取得
  const { fetchDonsData } = useAllDons()

  // 全Donsデータ（結果画面にデータ受け渡し）
  const [dons, setDons] = useAppContext()

  useEffect(() => {
    console.log('全Donsデータ', fetchDonsData)

    // dons取得後の処理
    if (fetchDonsData) {
      // 全Donsデータを次の画面に受け渡すためにセット
      setDons(fetchDonsData)

      const selectedId = Math.floor(Math.random() * fetchDonsData.length)
      console.log(fetchDonsData[selectedId].id)

      // 結果画面へ遷移
      console.log(`/select/result/${fetchDonsData[selectedId].id}`)
      router.push(`/select/result/${fetchDonsData[selectedId].id}`)
      // router.push(`/select/result/0`)
    }
  }, [fetchDonsData])

  return <>{loading && <p>Loading...</p>}</>
}
