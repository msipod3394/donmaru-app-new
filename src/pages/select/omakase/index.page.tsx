import { useLoadingState } from '@/hooks/useLoadingState'
import { useAllDons } from '@/hooks/useAllDons'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Omakase() {
  const router = useRouter()
  const { fetchDons } = useAllDons()
  const loading = useLoadingState()

  // state
  const [dons, setDons] = useState()

  // 初回 データ取得
  useEffect(() => {
    setDons(fetchDons)
  }, [])

  useEffect(() => {
    console.log('dons', dons)

    // dons取得後の処理
    if (dons && dons.length > 0) {
      const selectedId = Math.floor(Math.random() * dons.length)
      console.log(dons[selectedId].id)

      // 結果画面へ遷移
      router.push(`/select/result/${dons[selectedId].id}`)
    }
  }, [dons])

  return <>{loading && <p>Loading...</p>}</>
}
