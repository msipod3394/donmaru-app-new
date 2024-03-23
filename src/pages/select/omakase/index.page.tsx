import { useRouter } from 'next/router'
import { useEffect } from 'react'
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
      const shuffleID = Math.floor(Math.random() * dons.length)
      console.log('shuffle', shuffleID)

      const resultID = dons[shuffleID].id
      console.log('丼ID', resultID)

      // 結果画面へ遷移
      router.push(`/select/result/${resultID}`)
    }
  }, [dons])

  // return <>{loading && <p>Loading...</p>}</>
}
