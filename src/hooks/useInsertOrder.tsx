import React, { useState } from 'react'
import { supabase } from '@/lib/supabase'

// 注文履歴テーブルに追加
export const useInsertOrder = () => {
  const [error, setError] = useState<string | null>('')
  const [loading, setLoading] = useState<boolean>(false)

  const insertOrderTable = async (don_id: string | undefined, user_id: string) => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('orders')
        .insert([{ don_id, user_id }])
        .select()

      if (error) {
        throw new Error('注文履歴追加エラー')
      }

      if (data) {
        return true
      } else {
        throw new Error('注文履歴追加エラー')
      }
    } catch (error: any) {
      setError('注文履歴追加エラー')
      console.error('Error:', error.message)
      return false
    } finally {
      setLoading(false)
    }
  }

  return { insertOrderTable, loading, error }
}
