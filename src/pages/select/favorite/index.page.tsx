import React, { useEffect, useState } from 'react'
import { useUserContext } from '@/contexts/UserContext'
import { useFetchFavoriteData } from '@/hooks/useFetchFavoriteData'
import { useLoginCheck } from '@/hooks/useLoginCheck'
import { PageTitle } from '@/components/atoms/Texts/PageTitle'
import { LoadingIndicator } from '@/components/atoms/LoadingIndicator'
import { ItemCardList } from '@/components/molecules/ItemCardList'
import { ButtonRounded } from '@/components/atoms/Buttons/ButtonRounded'
import { useRouter } from 'next/router'
import { useAppContext } from '@/contexts/AppContext'
import { getAllDons } from '@/hooks/supabaseFunctions'

export default function PageOrder() {
  const router = useRouter()

  // 全Donsデータ（結果画面にデータ受け渡し）
  const [dons, setDons] = useAppContext()
  const fetchData = async () => {
    try {
      const allDons = await getAllDons()
      setDons(allDons)
    } catch (error) {
      console.error('エラーが発生しました', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // ユーザーチェック
  const getUser = useLoginCheck()
  const [user, setUser] = useUserContext()
  
  useEffect(() => {
    if (getUser) {
      setUser({
        id: getUser.id,
        email: getUser.email,
        user_name: '',
        password: '',
        created_at: '',
        updated_at: '',
      })
    }
  }, [])

  // お気に入り丼の取得
  const { loading, favoriteDons } = useFetchFavoriteData(user?.id)

  // 結果をステートに格納
  const [result, setResult] = useState<number | unknown>(0)

  useEffect(() => {
    const favoriteDonsIdArray = favoriteDons.map((item) => item.don_id)

    if (dons && favoriteDons) {
      const shuffleID = Math.floor(Math.random() * favoriteDonsIdArray.length)
      const resultID = dons[shuffleID].id
      setResult(resultID)
    }
  }, [dons, favoriteDons])

  // 結果画面へ遷移
  const clickShowResult = () => {
    router.push(`/select/result/${result}`)
  }

  return (
    <>
      <PageTitle title='お気に入りからガチャ' />
      {loading ? <LoadingIndicator /> : <ItemCardList items={favoriteDons} />}
      <ButtonRounded onClick={clickShowResult} className='isDark'>
        ガチャする
      </ButtonRounded>
    </>
  )
}
