import { useRouter } from 'next/router'
import { PageTitle } from '@/components/atoms/Texts/PageTitle'
import { useAppContext } from '@/contexts/AppContext'
import { DisplayResultDon } from './DisplayResultDon'
import { ActionButtons } from '../../../components/molecules/ActionButtons'
import { useUserContext } from '@/contexts/UserContext'
import { useInsertOrder } from '@/hooks/useInsertOrder'
import { useEffect, useState } from 'react'
import { DBDons } from '@/types/global_db.types'

export default function PageResult() {
  const router = useRouter()
  const resultID = Number(router.query.id)

  const [dons] = useAppContext()
  const [user] = useUserContext()
  const { insertOrderTable, error } = useInsertOrder()

  const [result, setResult] = useState<DBDons | unknown>({})

  // データがセットされていない場合、ホームにリダイレクトする
  useEffect(() => {
    // クライアントサイドでのみ実行されるようにする
    if (!dons && typeof window !== 'undefined') {
      router.push('/')
    }

    // 対象の商品を探してステートにセット
    if (dons) {
      let findResultDon = dons.find((don) => don.id === resultID)
      setResult(findResultDon)
      console.log('result', result)
    }
  }, [resultID])

  // 注文履歴に追加
  const handleAddOrder = async () => {
    if (result && user) {
      const don_id = result
      const user_id = user.id
      const success = await insertOrderTable(don_id, user_id)

      if (success) {
        alert('注文履歴に追加しました！')
      } else {
        console.error('注文履歴追加エラー:', error)
      }
    }
  }

  // 操作ボタンの追加
  const ActionButtonsData = [
    { func: handleAddOrder, text: '注文履歴に追加する', className: 'isDark' },
    { func: () => router.push('/'), text: 'もう一回ガチャする', className: '' },
  ]

  return (
    <>
      <PageTitle title='へいお待ち!' />
      {result && <DisplayResultDon don={result} />}
      <ActionButtons data={ActionButtonsData} />
    </>
  )
}
