import { useEffect, useState } from 'react'
import { useAllDons } from '@/hooks/useAllDons'
import { PageTitle } from '@/components/atoms/Texts/PageTitle'
import { DonCard } from '@/components/molecules/DonCard'
import { useUserContext } from '@/contexts/UserContext'
import { useOrderAllDons } from '@/hooks/useAllOrderDons'

export default function Menu() {
  const [loading, setLoading] = useState(false)

  // 全丼データのステート
  const [dons, setDons] = useState({})

  // 注文履歴
  const [order, setOrder] = useState({})

  // ユーザー情報
  const [user] = useUserContext()

  // 全丼データ取得
  const { fetchDonsData } = useAllDons()
  // const { fetchOrderDonsData } = useOrderAllDons(user.id)

  useEffect(() => {
    setLoading(true)

    if (fetchDonsData) {
      setDons(fetchDonsData)
      setLoading(false)
    }

    console.log('user', user)
    // console.log('fetchOrderDonsData', fetchOrderDonsData)
  }, [fetchDonsData])

  return (
    <>
      <PageTitle title='メニュー一覧' />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {Object.keys(dons).map((key) => (
            <DonCard key={key} don={dons[key]} />
          ))}
        </>
      )}
    </>
  )
}
