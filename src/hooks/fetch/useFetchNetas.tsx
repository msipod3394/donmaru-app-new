import { useCallback, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { DBUser } from '@/types/global_db.types'

export const useFetchNetas = () => {
  const [loading, setLoading] = useState(false)
  const [fetchNetas, setFetchNetas] = useState<DBUser[]>([])

  //  supabaseから値を取得
  const getFetchNetas = useCallback(async () => {
    setLoading(true)

    const { data, error } = await supabase.from('netas').select(`*`)
    if (error) {
      console.error('Error:', error.message)
    } else {
      setFetchNetas(data)
    }
    setLoading(false)
  }, [])

  // 注文情報を取得実行
  useEffect(() => {
    getFetchNetas()
  }, [])

  return { getFetchNetas, fetchNetas, loading }
}

// 呼ぶ側
// const { getFetchNetas, fetchNetas, loading } = useFetchNetas()
