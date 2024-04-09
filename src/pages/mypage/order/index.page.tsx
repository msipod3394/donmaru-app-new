// import { useFetchOrders } from '@/hooks/fetch/useFetchOrders'
import { PageTitle } from '@/components/atoms/Texts/PageTitle'
import { LoadingIndicator } from '@/components/atoms/LoadingIndicator'
import { useFetchOrders } from './usefetchOrder'
import { ItemCardList } from './ItemCardList'

export default function PageOrder() {
  // 注文情報の取得
  const { fetchOrders, loading } = useFetchOrders()

  return (
    <>
      <PageTitle title='注文履歴' />
      {loading ? (
        <LoadingIndicator />
      ) : fetchOrders?.length === 0 ? (
        <p>注文履歴はありません</p>
      ) : (
        <ItemCardList items={fetchOrders} />
      )}
    </>
  )
}
