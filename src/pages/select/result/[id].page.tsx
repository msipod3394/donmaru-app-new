import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useUserContext } from '@/contexts/UserContext'
import { useInsertOrder } from '@/hooks/useInsertOrder'
import { useFetchItems } from '@/hooks/fetch/useFetchItems'
import { PageTitle } from '@/components/atoms/Texts/PageTitle'
import { ActionButtons } from '@/components/molecules/ActionButtons'
import { DisplayResultDon } from './DisplayResultDon'
import { DBDons } from '@/types/global_db.types'

export default function PageResult() {
  const router = useRouter()
  const resultID = Number(router.query.id)

  // ステートで管理するもの
  const [result, setResult] = useState<DBDons | undefined>()
  // const [loading, setLoading] = useState(false)

  // ユーザー情報取得
  const [user] = useUserContext()

  // 丼データ取得
  const { fetchItems } = useFetchItems()

  // 注文履歴テーブルに追加するHooks
  const { insertOrderTable, error } = useInsertOrder()

  // 結果の丼を取得
  useEffect(() => {
    if (fetchItems) {
      // setLoading(true)

      let findResultDon = fetchItems.find((item) => item.id === resultID)
      setResult(findResultDon)

      // setLoading(false)
    }
  }, [resultID, fetchItems])

  // 注文履歴に追加ボタン
  const handleAddOrder = async () => {
    if (result && user) {
      const success = await insertOrderTable(result.id, user.id)

      if (success) {
        alert('注文履歴に追加しました！')
      } else {
        console.error('注文履歴追加エラー:', error)
      }
    }
  }

  // 下部ボタン
  const ActionButtonsData = [
    { func: handleAddOrder, text: '注文履歴に追加する', className: 'isDark' },
    { func: () => router.push('/'), text: 'もう一回ガチャする', className: '' },
  ]

  // if (loading) {
  //   return <div>Loading...</div>
  // }

  return (
    <>
      <PageTitle title='へいお待ち!' />
      {result && <DisplayResultDon don={result} />}
      <ActionButtons data={ActionButtonsData} />
    </>
  )
}
