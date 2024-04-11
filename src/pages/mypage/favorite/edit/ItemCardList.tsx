import styled from 'styled-components'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { VStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import {
  Favorite,
  Item,
  Order,
  useAddFavoritesMutation,
  useDeleteFavoritesMutation,
  useFetchFavoriteByEmailQuery,
  useSearchOrderByUserEmailQuery,
} from '@/gql/graphql'
import { useUserContext } from '@/contexts/UserContext'
import { convertFormattedDate } from '@/hooks/convertFormattedDate'
import { ItemCard } from './ItemCard'
import { ButtonRounded } from '@/components/atoms/Buttons/ButtonRounded'
import { handleUpdate } from './handleUpdate'

export function ItemCardList({ items }: { items: Item[] }) {
  const router = useRouter()

  // ユーザー情報を取得
  const [user, setUser] = useUserContext()

  // 登録する配列
  const [selectedIds, setSelectedIds] = useState<string[] | undefined>()
  const [addIds, setAddIds] = useState<string[] | undefined>()

  // 削除する配列
  const [deleteIds, setDeleteIds] = useState<string[] | undefined>([])

  // 取得したお気に入りデータ
  const [favorites, setFavorites] = useState<Favorite[]>()
  const [favoritesIds, setFavoritesId] = useState<Favorite[]>()

  // 注文履歴のステート管理
  const [orders, setOrders] = useState<Order[]>()

  // 注文履歴とお気に入りデータが取得された後に、データを処理
  const [endItems, setGetItems] = useState([])

  // お気に入りの取得
  const { refetch: refetchFavoritesByUserEmail } = useFetchFavoriteByEmailQuery({
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

  // お気に入りの更新関数
  const [addFavoritesMutation] = useAddFavoritesMutation()
  const [deleteFavoritesMutation] = useDeleteFavoritesMutation()

  // 選択中のお気に入り丼のIDを抽出
  useEffect(() => {
    if (favorites) {
      const favoriteIdArray = favorites.map((favorite) => favorite.item.id)
      setSelectedIds(favoriteIdArray)
      setFavoritesId(favoriteIdArray)
    }
  }, [favorites])

  // 注文履歴と注文回数を追加して、ItemCardに送る形に整形
  const getItems = useMemo(() => {
    if (!orders || !favorites) return []
    return items.map((item) => {
      const orderIdArray = orders.map((order) => order.item.id)
      const favoriteIdArray = selectedIds || []

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
  }, [orders, favorites, items, selectedIds])

  // 「お気に入りに追加する」クリック時の処理
  const clickAddFavorite = useCallback(
    (id: number) => {
      setSelectedIds((prevstate) => {
        if (prevstate && !prevstate.includes(id)) {
          // id が prevstate に含まれていない場合は、その id を追加した新しい配列を返す
          return [...prevstate, id]
        } else {
          // id が prevstate に含まれている場合は、そのままの配列を返す
          return [...prevstate]
        }
      })
    },
    [setSelectedIds],
  )

  useEffect(() => {
    if (selectedIds && favoritesIds) {
      const addFavoriteIds = selectedIds.filter((id) => !favoritesIds.includes(id))
      setAddIds(addFavoriteIds)
    }
  }, [selectedIds, favoritesIds])

  // 「お気に入りから削除する」クリック時の処理
  const clickRemoveFavorite = useCallback(
    (id: number) => {
      setSelectedIds((prevstate) => {
        if (prevstate && prevstate.includes(id)) {
          return prevstate.filter((itemId) => itemId !== id)
        } else {
          return prevstate ? [...prevstate, id] : [id]
        }
      })
    },
    [setSelectedIds],
  )

  useEffect(() => {
    if (favorites && selectedIds) {
      // チェックがついている・登録されていないIDを抽出（苦手ネタ追加）
      let deleteFavorite = favorites.filter((item) => !selectedIds.includes(item.item.id))
      const deleteFavoriteArray: string[] = deleteFavorite.map((item) => {
        return item.item.id
      })
      setDeleteIds(deleteFavoriteArray)
    }
  }, [selectedIds])

  // お気に入り更新
  const onSubmit = useCallback(async () => {
    if (user) {
      try {
        const success = await handleUpdate(
          user,
          selectedIds,
          deleteIds,
          addFavoritesMutation,
          deleteFavoritesMutation,
          refetchFavoritesByUserEmail,
        )
        if (success) {
          console.log('更新成功')
          router.push('/mypage/favorite/')
        } else {
          console.log('error')
        }
      } catch (error) {
        console.error('エラー:', error)
      }
    }
  }, [
    user,
    selectedIds,
    deleteIds,
    addFavoritesMutation,
    deleteFavoritesMutation,
    refetchFavoritesByUserEmail,
    router,
  ])

  return (
    <SBox>
      <p>
        選択中:
        {selectedIds?.map((item) => <span>{item},</span>)}
      </p>
      {getItems && (
        <>
          {getItems.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              FavoritesIds={selectedIds}
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
