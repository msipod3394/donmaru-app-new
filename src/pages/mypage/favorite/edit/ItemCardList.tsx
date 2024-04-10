import styled from 'styled-components'
import { useFilterItems } from './useFilterItems'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { VStack } from '@chakra-ui/react'
import { useUpdateFavorite } from '../handleUpdate'
import { useRouter } from 'next/router'
import {
  Favorite,
  Item,
  Order,
  useFetchFavoriteByEmailQuery,
  User,
  useSearchOrderByUserEmailQuery,
} from '@/gql/graphql'
import { useUserContext } from '@/contexts/UserContext'
import { convertFormattedDate } from '@/hooks/convertFormattedDate'
import { ItemCard } from './ItemCard'
import { ButtonRounded } from '@/components/atoms/Buttons/ButtonRounded'

export function ItemCardList({ items }: { items: Item[] }) {
  const router = useRouter()

  // ユーザー情報を取得
  const [user, setUser] = useUserContext()

  // お気に入り更新のステート管理
  const [favoritesIdArray, setFavoritesIdArray] = useState<string[] | undefined>()

  // 取得したお気に入りデータ
  const [favorites, setFavorites] = useState<Favorite[]>()

  // 注文履歴のステート管理
  const [orders, setOrders] = useState<Order[]>()

  // お気に入りの取得
  useFetchFavoriteByEmailQuery({
    variables: { email: user && user.email ? user.email : null },
    skip: !user,
    onCompleted: (data) => {
      if (data && data.favorites) {
        setFavorites(data.favorites)
      }
    },
  })

  // 注文履歴を取得
  useSearchOrderByUserEmailQuery({
    variables: { email: user && user.email ? user.email : null },
    skip: !user,
    onCompleted: (data) => {
      if (data && data.order) {
        setOrders(data.order)
      }
    },
  })

  // 注文履歴とお気に入りデータが取得された後に、データを処理
  const [endItems, setEndItems] = useState([])

  useEffect(() => {
    if (favorites) {
      const favoriteIdArray = favorites.map((favorite) => favorite.item.id)
      setFavoritesIdArray(favoriteIdArray)
    }
  }, [favorites])

  const getEndItems = useMemo(() => {
    if (!orders || !favorites) return []

    return items.map((item) => {
      const orderIdArray = orders.map((order) => order.item.id)
      const favoriteIdArray = favoritesIdArray || []

      let order_latest = ''
      let count = 0

      const favorite = favoriteIdArray.includes(item.id)
      const targetIdIndex = orderIdArray.indexOf(item.id)

      orderIdArray.forEach((orderId) => {
        if (orderId === item.id) {
          count++
        }
      })

      if (targetIdIndex !== -1) {
        const targetItem = orders[targetIdIndex]
        order_latest = convertFormattedDate(targetItem.updatedAt)
      }
      return { ...item, order_latest, count, favorite }
    })
  }, [orders, favorites, items, favoritesIdArray])

  // useEffect(() => {
  //   console.log(getEndItems)
  // }, [getEndItems])

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
    console.log('favoritesIdArray', favoritesIdArray)
  }, [favoritesIdArray])

  return (
    <SBox>
      <p>
        選択中:
        {favoritesIdArray?.map((item) => <span>{item},</span>)}
      </p>
      {getEndItems && (
        <>
          {getEndItems.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              FavoritesIds={favoritesIdArray}
              clickAddFavorite={clickAddFavorite}
              clickRemoveFavorite={clickRemoveFavorite}
            />
          ))}
        </>
      )}
      {/* <ButtonRounded onClick={onSubmit} className='isDark isFixed'>
        更新する
      </ButtonRounded> */}
    </SBox>
  )
}

const SBox = styled(VStack)`
  position: relative;
  padding-bottom: 2rem;
`
