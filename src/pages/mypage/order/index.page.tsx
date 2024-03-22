import React, { useEffect } from 'react'
import { useUserContext } from '@/contexts/UserContext'
import { useLoginCheck } from '@/hooks/useLoginCheck'
import { useOrderData } from '@/hooks/useFetchOrderData'
import { PageTitle } from '@/components/atoms/Texts/PageTitle'
import { LoadingIndicator } from '@/components/atoms/LoadingIndicator'
import { ItemCardList } from '../../../components/molecules/ItemCardList'

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

  const { loading, orderDons } = useOrderData(user?.id)

  return (
    <>
      <PageTitle title='注文履歴' />
      {loading ? <LoadingIndicator /> : <ItemCardList items={orderDons} />}
    </>
  )
}
