import { useFetchFavorites } from '@/hooks/fetch/useFetchFavorites'
import { useFetchOrdersData } from './useFetchOrdersData'
import { useFilterItems } from './useFilterItems'
import { ItemCard } from './ItemCard'
import { formattedData } from '@/types/formattedData'
import { useCallback, useEffect, useState } from 'react'

export function ItemCardList({ items }: { items: formattedData[] }) {
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
  const clickAddFavorite = useCallback((id: number) => {
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
  }, [endItems])

  // 「お気に入りから削除する」クリック時の処理
  const clickRemoveFavorite = useCallback((id: number) => {
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
        return prevstate.filter(itemId => itemId !== id); // id を削除した新しい配列を返す
      } else {
        return [...prevstate]
      }
    })
  }, [endItems])
  
  useEffect(() => {
    console.log('FavoritesIdArray', FavoritesIdArray)
  }, [FavoritesIdArray])

  return (
    <>
      {endItems && (
        <>
          <p>
            選択中:
            {FavoritesIdArray?.map((item) => <span>{item},</span>)}
          </p>
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
    </>
  )
}
