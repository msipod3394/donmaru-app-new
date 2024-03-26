import { useCallback, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export const useFetchOrders = (userID: string) => {
  const [loading, setLoading] = useState(false)
  const [fetchOrders, setFetchOrders] = useState([])

  //  supabaseから値を取得
  const getFetchOrders = useCallback(async (userID: string) => {
    setLoading(true)
    const { data, error } = await supabase
      .from('orders')
      .select(`*,  dons( *, dons_netas( netas( * ) ) )`)
      .eq('user_id', userID)
    if (error) {
      console.error('Error fetching items:', error.message)
    } else {
      setFetchOrders(data)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    getFetchOrders(userID)
  }, [getFetchOrders])

  return { getFetchOrders, fetchOrders, loading }
}

// 呼ぶ側
// const { getFetchOrders, fetchOrders, loading } = useFetchOrders(userId)
