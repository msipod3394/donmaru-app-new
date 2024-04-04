// import { useFetchOrders } from '@/hooks/fetch/useFetchOrders'
import { PageTitle } from '@/components/atoms/Texts/PageTitle'
import { LoadingIndicator } from '@/components/atoms/LoadingIndicator'
import { ItemCardList } from '@/components/molecules/ItemCardList'
import { useFetchOrders } from './usefetchOrder'

export default function PageOrder() {
  // 注文情報の取得
  const { fetchOrders, loading } = useFetchOrders()
  // console.log(fetchOrders)

  // const { data, loading, error } = useSearchOrderByUserIdQuery({
  //   variables: {
  //     userId: 1, // ユーザーIDを指定
  //   },
  // });

  // console.log(data);

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
