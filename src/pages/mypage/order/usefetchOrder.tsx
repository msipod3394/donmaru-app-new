import { useState, useEffect } from 'react'
import { useCheckLogin } from '@/hooks/useLoginCheck'
import { useSearchOrderByUserEmailQuery } from '@/gql/graphql'

export const useFetchOrders = () => {
  const [loading, setLoading] = useState(false)
  const [fetchOrders, setFetchOrders] = useState([])
  const { getUser } = useCheckLogin()
  const [user, setUser] = useState(1)

  useEffect(() => {
    setUser(getUser)
  }, [getUser])

  const {
    data: sendOrderData,
    loading: sendOrderLoading,
    error: sendOrderError,
    refetch: refetchOrdersByUserEmail,
  } = useSearchOrderByUserEmailQuery({
    variables: { email: user && user.email ? user.email : null },
    skip: !user,
  })

  useEffect(() => {
    const fetchOrdersByUserEmail = async () => {
      if (user) {
        setLoading(true)
        try {
          await refetchOrdersByUserEmail()
        } catch (error) {
          console.error('注文データの取得エラー:', error)
        } finally {
          setLoading(false)
        }
      }
    }

    if (user) {
      fetchOrdersByUserEmail()
    }
  }, [user, refetchOrdersByUserEmail]) // userが更新されたとき、またはクエリの再実行関数が更新されたときに実行

  useEffect(() => {
    if (sendOrderData) {
      setFetchOrders(sendOrderData.order)
    }
  }, [sendOrderData]) // データが更新されたときに実行

  return { fetchOrders, loading }
}
