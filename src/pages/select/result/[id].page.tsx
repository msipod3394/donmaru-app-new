import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useUserContext } from '@/contexts/UserContext'
import { PageTitle } from '@/components/atoms/Texts/PageTitle'
import { ActionButtons } from '@/components/molecules/ActionButtons'
import { DisplayResultItem } from './DisplayResultItem'
import {
  Exact,
  InputMaybe,
  Item,
  SearchItemsByIdQuery,
  useCreateOrderMutation,
  useSearchItemsByIdQuery,
} from '@/gql/graphql'
import { QueryHookOptions } from '@apollo/client'
import { LoadingIndicator } from '@/components/atoms/LoadingIndicator'

export default function PageResult() {
  const router = useRouter()

  // ！！ここの型指定 謎なので質問する
  const resultID: InputMaybe<string> = router.query.id as InputMaybe<string>

  const queryOptions: QueryHookOptions<
    SearchItemsByIdQuery,
    Exact<{ id?: InputMaybe<string> | undefined }>
  > = {
    variables: { id: resultID },
  }

  // ステートで管理するもの
  const [result, setResult] = useState<Item | undefined>()

  // ユーザー情報取得
  const [user] = useUserContext()

  // 丼データ取得
  const { data, loading } = useSearchItemsByIdQuery(queryOptions)

  // 結果の丼を取得
  useEffect(() => {
    if (data) {
      setResult(data.items[0])
    }
  }, [resultID, data])

  const [createOrderMutation] = useCreateOrderMutation()

  // 注文履歴に追加ボタン
  const handleAddOrder = () => {
    if (result) {
      createOrderMutation({
        variables: {
          itemId: result.id,
          // userId: user.email,
          userId: '1', // 一旦
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
