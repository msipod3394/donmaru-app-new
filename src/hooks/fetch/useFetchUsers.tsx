import { useCallback, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export const useFetchUsers = () => {
  const [loading, setLoading] = useState(false)
  const [fetchUsers, setFetchUsers] = useState([])

  //  supabaseから値を取得
  const getFetchUsers = useCallback(async () => {
    setLoading(true)
    const { data, error } = await supabase.from('users').select('*')
    if (error) {
      console.error('Error fetching items:', error.message)
    } else {
      setFetchUsers(data)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    getFetchUsers()
  }, [getFetchUsers])

  return { getFetchUsers, fetchUsers, loading }
}

// 呼ぶ側
// const { getFetchUsers, fetchUsers, loading } = useFetchUsers()
