import { useCallback, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useCheckLogin } from '../useLoginCheck'
import { DBUser } from '@/types/global_db.types'

export const useFetchOrders = () => {
  const [loading, setLoading] = useState(false)
  const [fetchOrders, setFetchOrders] = useState<DBUser[]>([])

  // ユーザー情報を取得
  const { getUser } = useCheckLogin()
  const [user, setUser] = useState<DBUser>()

  //  supabaseから値を取得
  const getFetchOrders = useCallback(async () => {
    setLoading(true)
    if (user && user.id) {
      const { data, error } = await supabase
        .from('orders')
        .select(`*,  dons( *, dons_netas( netas( * ) ) )`)
        .eq('user_id', user.id)
      if (error) {
        console.error('Error:', error.message)
      } else {
        setFetchOrders(data)
      }
      setLoading(false)
    } else {
      console.log('ユーザー情報が取得できません')
      setLoading(false)
    }
  }, [user])

  // ユーザー情報を取得実行
  useEffect(() => {
    setUser(getUser)
  }, [getUser])

  // 注文情報を取得実行
  useEffect(() => {
    getFetchOrders()
  }, [user, getFetchOrders])

  return { getFetchOrders, fetchOrders, loading }
}

// 呼ぶ側
// const { getFetchOrders, fetchOrders, loading } = useFetchOrders()