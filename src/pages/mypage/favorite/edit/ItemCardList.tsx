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
import { ButtonRounded } from '@/components/atoms/buttons/ButtonRounded'
import { handleUpdate } from './handleUpdate'
import { ItemCard } from './ItemCard'

export function ItemCardList({ items }: { items: Item[] }) {
  const router = useRouter()

  // ユーザー情報を取得
  const [user, setUser] = useUserContext()

  // 登録する配列
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  // 削除する配列
  const [deleteIds, setDeleteIds] = useState<string[]>([])

  // 取得したお気に入りデータ
  const [favorites, setFavorites] = useState<Favorite[]>()

  // 注文履歴のステート管理
  const [orders, setOrders] = useState<Order[]>()

  // お気に入りの取得
  const { refetch: refetchFavoritesByUserEmail } = useFetchFavoriteByEmailQuery({
    variables: { email: user?.email || null },
    skip: !user,
    onCompleted: (data) => {
      if (data && data.favorites) {
        setFavorites(data.favorites)
      }
    },
  })

  // 注文履歴を取得
  useSearchOrderByUserEmailQuery({
    variables: { email: user?.email || null },
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
    }
  }, [favorites])

  // 注文履歴と注文回数を追加して、ItemCardに送る形に整形
  const getItems = useMemo(() => {
    if (!orders || !favorites) return []
    return items.map((item) => {
      const count = orders.filter((order) => order.item.id === item.id).length
      const latestOrder = orders.find((order) => order.item.id === item.id)
      const order_latest = latestOrder ? convertFormattedDate(latestOrder.updatedAt) : ''
      const favorite = selectedIds.includes(item.id)
      return { ...item, count, order_latest, favorite }
    })
  }, [orders, favorites, items, selectedIds])

  // 「お気に入りに追加する」クリック時の処理
  const clickToggleFavorite = useCallback(
    (id: string) => {
      setSelectedIds((prevIds) => {
        if (prevIds.includes(id)) {
          // IDが既に含まれている場合は、そのIDを削除して返す
          return prevIds.filter((itemId) => itemId !== id)
        } else {
          // IDが含まれていない場合は、そのIDを追加して返す
          return [...prevIds, id]
        }
      })
    },
    [setSelectedIds],
  )

  // チェックがついている・登録されていないIDを抽出（苦手ネタ追加）
  useEffect(() => {
    console.log(selectedIds)
    if (favorites && selectedIds) {
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
      {/* <p>
        選択中:
        {selectedIds?.map((item) => <span>{item},</span>)}
      </p> */}
      {getItems && (
        <>
          {getItems.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              FavoritesIds={selectedIds}
              clickAddFavorite={clickToggleFavorite}
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
