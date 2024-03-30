import { useFetchFavorites } from '@/hooks/fetch/useFetchFavorites'
import { useFetchOrdersData } from './useFetchOrdersData'
import { useFilterItems } from './useFilterItems'
import { ItemCard } from './ItemCard'
import { formattedData } from '@/types/formattedData'
import { useCallback, useEffect, useState } from 'react'
import { ButtonRounded } from '@/components/atoms/Buttons/ButtonRounded'
import { VStack } from '@chakra-ui/react'
import styled from 'styled-components'
import { useCheckLogin } from '@/hooks/useLoginCheck'
import { DBUser } from '@/types/global_db.types'
import { handleUpdate } from '../handleUpdate'

export function ItemCardList({ items }: { items: formattedData[] }) {
  // ユーザー情報を取得
  const { getUser } = useCheckLogin()
  const [user, setUser] = useState<DBUser>()

  // お気に入り更新のステート管理
  const [FavoritesIdArray, setFavoritesIdArray] = useState<number[] | undefined>()

  // お気に入りを取得
  const { fetchFavorites } = useFetchFavorites()

  // 注文履歴を取得
  const order = useFetchOrdersData()

  // ItemCard に送る形に整形
  const getEndItems = useFilterItems(items, order, fetchFavorites)
  const [endItems, setEndItems] = useState([])

  useEffect(() => {
    if (fetchFavorites) {
      const FavoritesIdArray = fetchFavorites.map((item) => item.don_id)
      setFavoritesIdArray(FavoritesIdArray)
    }
    setEndItems([...getEndItems])
  }, [fetchFavorites])

  // 「お気に入りに追加する」クリック時の処理
  const clickAddFavorite = useCallback(
    (id: number) => {
      setFavoritesIdArray((prevstate) => {
        if (prevstate && !prevstate.includes(id)) {
          setEndItems((prevItems) => {
            return prevItems.map((item) => {
              if (item.id === id) {
                return { ...item, favorite: true }
              }
              return item
            })
          })
          return [...prevstate, id]
        } else {
          return [...prevstate]
        }
      })
    },
    [endItems],
  )

  // 「お気に入りから削除する」クリック時の処理
  const clickRemoveFavorite = useCallback(
    (id: number) => {
      setFavoritesIdArray((prevstate) => {
        if (prevstate && prevstate.includes(id)) {
          setEndItems((prevItems) => {
            return prevItems.map((item) => {
              if (item.id === id) {
                return { ...item, favorite: false }
              }
              return item
            })
          })
          return prevstate.filter((itemId) => itemId !== id) // id を削除した新しい配列を返す
        } else {
          return [...prevstate]
        }
      })
    },
    [endItems],
  )

  useEffect(() => {
    console.log('FavoritesIdArray', FavoritesIdArray)
  }, [FavoritesIdArray])

  // ユーザー情報を取得実行
  useEffect(() => {
    setUser(getUser)
  }, [getUser])

  // お気に入りの更新
  const onSubmit = useCallback(() => {
    if (user) {
      console.log('FavoritesIdArray', FavoritesIdArray)
      console.log('user', user)
      handleUpdate(FavoritesIdArray, user)
    }
  }, [FavoritesIdArray])

  return (
    <SBox>
      <p>
        選択中:
        {FavoritesIdArray?.map((item) => <span>{item},</span>)}
      </p>
      {endItems && (
        <>
          {endItems.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              FavoritesIds={FavoritesIdArray}
              clickAddFavorite={clickAddFavorite}
              clickRemoveFavorite={clickRemoveFavorite}
            />
          ))}
        </>
      )}
      <ButtonRounded onClick={onSubmit} className='isDark isFixed'>
        更新する
      </ButtonRounded>
    </SBox>
  )
}

const SBox = styled(VStack)`
  position: relative;
  padding-bottom: 2rem;
`
