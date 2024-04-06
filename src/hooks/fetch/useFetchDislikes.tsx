import { useCallback, useEffect, useState } from 'react'
import { useCheckLogin } from '../useLoginCheck'
import { DBUser } from '@/types/global_db.types'
import { useFetchDislikeByEmailQuery } from '@/gql/graphql'

export const useFetchDislikes = () => {
  const [loading, setLoading] = useState(false)
  const [fetchDislikes, setFetchDislikes] = useState<DBUser[]>([])

  // ユーザー情報を取得
  const { getUser } = useCheckLogin()
  const [user, setUser] = useState<DBUser>()

  // ユーザー情報を取得実行
  useEffect(() => {
    setUser(getUser)
  }, [getUser])

  // GQLから苦手ネタを取得
  const {
    data: dislikeData,
    loading: dislikeLoading,
    error: dislikeError,
    refetch: refetchDislikesByUserEmail,
  } = useFetchDislikeByEmailQuery({
    variables: { email: user && user.email ? user.email : null },
    skip: !user,
  })

  useEffect(() => {
    const fetchDislikesByUserEmail = async () => {
      if (user) {
        setLoading(true)
        try {
          await refetchDislikesByUserEmail()
        } catch (error) {
          console.error('取得エラー:', error)
        } finally {
          setLoading(false)
        }
      }
    }

    if (user) {
      fetchDislikesByUserEmail()
    }
  }, [user, useFetchDislikeByEmailQuery])

  useEffect(() => {
    if (dislikeData) {
      setFetchDislikes(dislikeData.dislikes)
    }
  }, [dislikeData, dislikeLoading])

  return { fetchDislikes, dislikeLoading, dislikeError }
}

// 呼ぶ側
// const { getFetchDislikes, fetchDislikes, loading } = useFetchDislikes()
