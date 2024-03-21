import { useEffect, useState } from 'react'
import { useAllDons } from '@/hooks/useAllDons'
import { PageTitle } from '@/components/atoms/Texts/PageTitle'
import { DonCard } from '@/components/molecules/DonCard'
import { useUserContext } from '@/contexts/UserContext'
import { useAllOrderDons } from '@/hooks/useAllOrderDons'
import { useLoginCheck } from '@/hooks/useLoginCheck'
import { getAllOrder } from '@/hooks/supabaseFunctions'
import { convertFormattedDate } from '@/hooks/convertFormattedDate'

export default function PageOrder() {
  const [loading, setLoading] = useState(false)

  // 全丼データのステート
  const [orderDons, setOrderDons] = useState({})

  // ユーザー情報
  const getUser = useLoginCheck()
  const [user, setUser] = useUserContext()

  useEffect(() => {
    console.log('ユーザー情報', getUser)

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

  useEffect(() => {
    if (user && user.id) {
      fetchData()
    }
  }, [user])

  // 初回読み込み時
  const fetchData = async () => {
    try {
      // 全ての丼データを取得
      const [allOrder] = await Promise.all([getAllOrder(user.id)])

      // 注文履歴
      // カウント数を取得・更新
      const donIdCounts = {}
      allOrder.forEach((order) => {
        const donId = order.don_id
        donIdCounts[donId] = (donIdCounts[donId] || 0) + 1
      })

      const allOrderAddCount = allOrder.map((order) => {
        const donId = order.don_id
        const count = donIdCounts[donId]
        return { ...order, count }
      })

      // 最新の注文データだけにソート
      const latestOrdersMap = new Map()
      allOrderAddCount.forEach((order) => {
        const existingOrder = latestOrdersMap.get(order.don_id)
        const formattedDate = convertFormattedDate(order.updated_at)
        order.updated_at = formattedDate
        if (
          !existingOrder ||
          new Date(order.updated_at) > new Date(existingOrder.updated_at)
        ) {
          latestOrdersMap.set(order.don_id, order)
        }
      })

      const latestOrders = Array.from(latestOrdersMap.values())

      console.log('latestOrders', latestOrders)

      setOrderDons(latestOrders)
    } catch (error) {
      console.error('エラーが発生しました', error)
    }
  }

  return (
    <>
      <PageTitle title='注文履歴' />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {orderDons &&
            Object.keys(orderDons).map((key) => (
              <DonCard key={key} don={orderDons[key]} />
            ))}
        </>
      )}
    </>
  )
}
