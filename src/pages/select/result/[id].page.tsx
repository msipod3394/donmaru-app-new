import { useRouter } from 'next/router'
import { PageTitle } from '@/components/atoms/Texts/PageTitle'
import { useAppContext } from '@/contexts/AppContext'
import { DisplayResultDon } from './DisplayResultDon'
import { ActionButtons } from '../../../components/molecules/ActionButtons'
import { useUserContext } from '@/contexts/UserContext'
import { useInsertOrder } from '@/hooks/useInsertOrder'
import { useEffect } from 'react'

export default function PageResult() {
  const router = useRouter()
  const resultId = router.query.id as string

  const [dons] = useAppContext()
  const [user] = useUserContext()
  const { insertOrderTable, error } = useInsertOrder()

  // データがセットされていない場合、ホームにリダイレクトする
  useEffect(() => {
    // クライアントサイドでのみ実行されるようにする
    if (!dons && typeof window !== 'undefined') {
      router.push('/')
    }
  }, [dons, router])

  // 注文履歴に追加
  const handleAddOrder = async () => {
    if (dons[resultId] && user) {
      const don_id = dons[resultId].id
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
      {dons && <DisplayResultDon don={dons[resultId]} />}
      <ActionButtons data={ActionButtonsData} />
    </>
  )
}
