import { useCallback, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { FetchItemsResponse } from '@/types/FetchItemsResponse'

export const useFetchItems = () => {
  const [loading, setLoading] = useState(false)
  const [fetchItems, setFetchItems] = useState<FetchItemsResponse>([])

  //  supabaseから値を取得
  const getFetchItems = useCallback(async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('dons')
      .select('*,  dons_netas( netas( * ) )')
    if (error) {
      console.error('Error fetching items:', error.message)
    } else {
      setFetchItems(data || []) // データがあればセット、なければ空の配列をセット
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    getFetchItems()
  }, [getFetchItems])

  return { getFetchItems, fetchItems, loading }
}

// 呼ぶ側
// const { getFetchItems, fetchItems, loading } = useFetchItems()
