import { useEffect } from 'react'
import { getAllDons } from '@/hooks/supabaseFunctions'
import { useAppContext } from '@/contexts/AppContext'

export function useFetchDonData() {
  const [fetchDons, setFetchDons] = useAppContext()

  const fetchData = async () => {
    try {
      const allDons = await getAllDons()
      setFetchDons(allDons)
    } catch (error) {
      console.error('エラーが発生しました', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return fetchDons
}
