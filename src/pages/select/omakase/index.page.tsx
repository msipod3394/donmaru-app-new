import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAppContext } from '@/contexts/AppContext'
import { getAllDons } from '@/hooks/supabaseFunctions'

export default function OmakasePage() {
  const router = useRouter()

  // 全Donsデータ（結果画面にデータ受け渡し）
  const [dons, setDons] = useAppContext()

  // 初回読み込み時
  const fetchData = async () => {
    try {
      const allDons = await getAllDons()
      setDons(allDons)
    } catch (error) {
      console.error('エラーが発生しました', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // データが取得された後に実行
  useEffect(() => {
    console.log('dons', dons)

    if (dons) {
      const selectedId = Math.floor(Math.random() * dons.length)
      console.log(dons[selectedId])
      console.log(dons[selectedId].id)

      // 結果画面へ遷移
      router.push(`/select/result/${dons[selectedId].id}`)
    }
  }, [dons])

  // return <>{loading && <p>Loading...</p>}</>
}
