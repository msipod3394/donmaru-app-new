import { useEffect } from 'react'
import { useQuery, gql } from '@apollo/client'

// クエリ定義
const GET_POSTS = gql`
  query {
    itemsAll {
      id
      name
      image
      createdAt
      updatedAt
    }
  }
`

export const useFetchItems = () => {
  const { loading, error, data, refetch } = useQuery(GET_POSTS, {
    fetchPolicy: 'network-only',
  })

  useEffect(() => {
    // dataが更新されたときに実行
    const handleDataUpdate = () => {
      if (data) {
        // console.log('data:', data)
      }
    }

    handleDataUpdate()
  }, [data])

  return { loading, error, data, refetch }
}
