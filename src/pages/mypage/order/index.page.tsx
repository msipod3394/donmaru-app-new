// import { useFetchOrders } from '@/hooks/fetch/useFetchOrders'
import { PageTitle } from '@/components/atoms/texts/PageTitle'
import { LoadingIndicator } from '@/components/atoms/LoadingIndicator'
import { useFetchOrders } from './usefetchOrder'
import { ItemCardList } from '../components/ItemCardList'

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
