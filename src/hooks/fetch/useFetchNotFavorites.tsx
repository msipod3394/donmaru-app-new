import { useCallback, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useFetchFavorites } from './useFetchFavorites'
import { DBDons } from '@/types/global_db.types'

export const useFetchNotFavorites = () => {
  // State管理
  const [loading, setLoading] = useState(false)
  const [fetchNotFavorites, setFetchNotFavorites] = useState<DBDons | undefined>(
    undefined,
  )
  const [favoriteIds, setFavoriteIds] = useState<number[]>([])

  // お気に入り情報を取得
  const { fetchFavorites } = useFetchFavorites()

  //  supabaseから値を取得
  const getFetchNotFavorites = useCallback(
    async (favoriteid: number[]) => {
      setLoading(true)
      if (favoriteid) {
        const result = `(${favoriteid.join(',')})`
        const { data, error } = await supabase
          .from('dons')
          .select(`*, dons_netas( netas( * ) ) `)
          .not('id', 'in', result)
        if (error) {
          console.error('Error:', error.message)
        } else {
          setFetchNotFavorites(data)
        }
        setLoading(false)
      } else {
        console.log('情報が取得できません')
        setLoading(false)
      }
    },
    [setFavoriteIds],
  )

  // fetchFavorites の don_id だけを抽出して配列にする
  useEffect(() => {
    const donIdArray = fetchFavorites.map((item) => item.don_id)
    setFavoriteIds(donIdArray)
  }, [fetchFavorites])

  // お気に入りではない丼情報を取得を取得実行
  useEffect(() => {
    getFetchNotFavorites(favoriteIds)
  }, [favoriteIds, setFavoriteIds])

  return { getFetchNotFavorites, fetchNotFavorites, loading }
}

// 呼ぶ側
// const { getFetchNotFavorites, fetchNotFavorites, loading } = useFetchNotFavorites()
