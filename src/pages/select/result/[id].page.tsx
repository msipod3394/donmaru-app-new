import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { PageTitle } from '@/components/atoms/texts/PageTitle'
import { ActionButtons } from '@/components/molecules/ActionButtons'
import { DisplayResultItem } from './DisplayResultItem'
import { Item, useCreateOrderMutation, useSearchItemsByIdQuery } from '@/gql/graphql'
import { LoadingIndicator } from '@/components/atoms/LoadingIndicator'
import { useUserContext } from '@/contexts/UserContext'
import { useCheckLogin } from '@/hooks/useLoginCheck'

export default function PageResult() {
  const router = useRouter()

  // ユーザー情報をセット
  const [user, setUser] = useUserContext()
  const checkLogin = useCheckLogin()

  useEffect(() => {
    if (Object.keys(user).length === 0 && checkLogin !== undefined) {
      setUser(checkLogin)
    }
  }, [user, checkLogin])


  // ステートで管理するもの
  const [result, setResult] = useState<Item | undefined>()

  // クエリパラメーターから結果IDを取得
  const resultID = Array.isArray(router.query.id) ? router.query.id[0] : router.query.id

  // 結果データ取得
  const { data, loading } = useSearchItemsByIdQuery({
    variables: { id: resultID },
  })

  // 結果の丼を取得
  useEffect(() => {
    if (data) {
      setResult(data.items[0])
    }
  }, [resultID, data])

  const [createOrderMutation] = useCreateOrderMutation()

  // 注文履歴に追加ボタン
  const handleAddOrder = () => {
    if (result && user) {
      const userId = user.id.toString()

      createOrderMutation({
        variables: {
          itemId: result.id,
          userId: userId,
        },
      })
        .then((order_result) => {
          console.log('注文履歴登録成功:', order_result.data?.createOrder)
          alert('注文履歴に登録しました！')
        })
        .catch((error) => {
          console.error('注文履歴登録エラー:', error)
          alert('注文履歴登録時にエラーが発生しました')
        })
    }
  }

  // 下部ボタン
  const ActionButtonsData = [
    { func: handleAddOrder, text: '注文履歴に追加する', className: 'isDark' },
    { func: () => router.push('/'), text: 'もう一回ガチャする', className: '' },
  ]

  return (
    <>
      <PageTitle title='へいお待ち!' />
      {loading ? (
        <LoadingIndicator />
      ) : (
        <>
          {result && <DisplayResultItem item={result} />}
          <ActionButtons data={ActionButtonsData} />
        </>
      )}
    </>
  )
}
