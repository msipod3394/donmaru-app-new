import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useFetchFavorites } from '@/hooks/fetch/useFetchFavorites'
import { ButtonRounded } from '@/components/atoms/Buttons/ButtonRounded'
import { PageTitle } from '@/components/atoms/Texts/PageTitle'
import { LoadingIndicator } from '@/components/atoms/LoadingIndicator'
import { ItemCardList } from '@/components/molecules/ItemCardList'
import { Text } from '@chakra-ui/react'

export default function PageSelectFavorite() {
  const router = useRouter()

  // 結果をステート管理
  const [result, setResult] = useState('')

  // お気に入り情報の取得
  const { fetchFavorites, loading } = useFetchFavorites()
  console.log('fetchFavorites', fetchFavorites)

  // データが取得された後に実行
  useEffect(() => {
    console.log('fetchFavorites', fetchFavorites?.length)

    if (fetchFavorites.length > 0) {
      const shuffleID = Math.floor(Math.random() * fetchFavorites.length)
      console.log('shuffle', shuffleID)

      const resultID = fetchFavorites[shuffleID].don_id
      console.log('丼ID', resultID)
      setResult(resultID)
    }
  }, [fetchFavorites])

  // 結果画面へ遷移
  const clickShowResult = () => {
    router.push(`/select/result/${result}`)
  }

  return (
    <>
      <PageTitle title='お気に入りからガチャ' />
      {loading ? (
        <LoadingIndicator />
      ) : fetchFavorites.length === 0 ? (
        <>
          <Text align='center' mb='2rem'>
            お気に入り登録はありません
          </Text>
          <ButtonRounded
            onClick={() => router.push('/mypage/favorite')}
            className='isDark'
          >
            お気に入りを登録しよう
          </ButtonRounded>
        </>
      ) : (
        <>
          <ItemCardList items={fetchFavorites} />
          <ButtonRounded onClick={clickShowResult} className='isDark'>
            ガチャする
          </ButtonRounded>
        </>
      )}
    </>
  )
}
