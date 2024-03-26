import React, { useEffect } from 'react'
import { useUserContext } from '@/contexts/UserContext'
import { useLoginCheck } from '@/hooks/useLoginCheck'
import { useFetchOrders } from '@/hooks/fetch/useFetchOrders'
import { PageTitle } from '@/components/atoms/Texts/PageTitle'
import { LoadingIndicator } from '@/components/atoms/LoadingIndicator'
import { ItemCardList } from '@/components/molecules/ItemCardList'

export default function PageOrder() {
  const getUser = useLoginCheck()
  const [user, setUser] = useUserContext()

  useEffect(() => {
    if (getUser) {
      setUser({
        id: getUser.id,
        email: getUser.email,
        user_name: '',
        password: '',
        created_at: '',
        updated_at: '',
      })
    }
  }, [])

  // 注文情報の取得
  const { fetchOrders, loading } = useFetchOrders(user.id)

  return (
    <>
      <PageTitle title='注文履歴' />
      {loading ? (
        <LoadingIndicator />
      ) : fetchOrders.length === 0 ? (
        <p>注文履歴はありません</p>
      ) : (
        <ItemCardList items={fetchOrders} />
      )}
    </>
  )
}
