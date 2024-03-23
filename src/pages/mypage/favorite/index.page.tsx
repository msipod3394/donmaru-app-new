import React, { useEffect, useState } from 'react'
import { useUserContext } from '@/contexts/UserContext'
import { useFetchFavoriteData } from '@/hooks/useFetchFavoriteData'
import { useLoginCheck } from '@/hooks/useLoginCheck'
import { PageTitle } from '@/components/atoms/Texts/PageTitle'
import { LoadingIndicator } from '@/components/atoms/LoadingIndicator'
import { ItemCardList } from '@/components/molecules/ItemCardList'
import { getNotFavoriteDons } from '@/hooks/supabaseFunctions'
import { ItemCardShort } from '@/components/molecules/Cards/ItemCardShort'
import styled from 'styled-components'
import { Text, VStack, HStack, Image } from '@chakra-ui/react'
import { DBDons } from '@/types/global_db.types'

export default function PageOrder() {
  const getUser = useLoginCheck()

  // ユーザーチェック
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

  // お気に入りではない丼のステート
  const [notFavoriteDons, setNotFavoriteDons] = useState([])

  useEffect(() => {
    console.log('favoriteDons', favoriteDons)
    const favoriteDonsIdArray = favoriteDons.map((item) => item.don_id)
    console.log('favoriteDonsIdArray', favoriteDonsIdArray)

    // 非同期関数内でデータを取得する
    const fetchData = async () => {
      const unFavoriteDonsData = await getNotFavoriteDons(favoriteDonsIdArray)
      console.log('unFavoriteDonsData', unFavoriteDonsData)
      setNotFavoriteDons(unFavoriteDonsData)

      console.log(notFavoriteDons.length)
    }

    // 非同期関数を呼び出す
    fetchData()
  }, [favoriteDons])

  return (
    <>
      <PageTitle title='お気に入り管理' />
      {loading ? (
        <LoadingIndicator />
      ) : (
        <>
          <ItemCardList items={favoriteDons} />
          {notFavoriteDons && notFavoriteDons.length > 0 ? (
            notFavoriteDons.map((item: DBDons) => (
              <SBox key={item.id}>
                <Image w='80px' src={`/menu/${item.image}`} alt={item.title} />
                <SBoxIn spacing={0.5}>
                  <Text size='sm' fontWeight='500'>
                    {item.title}
                  </Text>
                  <HStack gap={0} flexWrap='wrap'>
                    {item.dons_netas &&
                      Array.isArray(item.dons_netas) &&
                      item.dons_netas.map(
                        (neta: { netas: { name: string } }, index: number) => {
                          const netaName = neta.netas && neta.netas.name
                          return (
                            <Text as='span' fontSize='xs' key={index}>
                              {index > 0 && <>・</>}
                              {netaName}
                            </Text>
                          )
                        },
                      )}
                  </HStack>
                </SBoxIn>
              </SBox>
            ))
          ) : (
            <p>お気に入りではない丼はありません。</p>
          )}
        </>
      )}
    </>
  )
}

// スタイル
const SBox = styled(HStack)`
  position: relative;
  width: 100%;
  border: 2px solid #000;
  padding: 1rem;
  border-radius: 5px;
`
const SBoxIn = styled(VStack)`
  align-items: flex-start;
`
const SFixButtonArea = styled(VStack)`
  position: fixed;
  bottom: 2.4rem;
`
