import { useState, useEffect } from 'react'
import { getAllDons, getAllFavoriteDons, getAllOrder } from './supabaseFunctions'

const useFetchDonsData = () => {
  // ログイン状況
  // const { loginUser } = useLoginUser();

  // 全ての丼
  const [dons, setDons] = useState([])
  // お気に入りに追加した丼ID
  const [favoriteDonsIDs, setFavoriteDonsIDs] = useState([])
  // 注文履歴
  const [order, setOrder] = useState([])
  // 全データが追加された状態
  const [allData, setAllData] = useState([])
  // const [fullDons, setFullDons] = useState([]);

  // 全てのプロパティが揃ったデータ
  // const { fullPropertyDons, setFullDons } = useFullPropertyDons();

  // 初回読み込み時
  const fetchData = async () => {
    try {
      // 全ての丼データを取得
      const [allDons, allFavoriteDons, allOrder] = await Promise.all([
        getAllDons(),
        getAllFavoriteDons(),
        getAllOrder(loginUser.id),
      ])

      setDons(allDons)

      // お気に入り丼の取得
      if (allFavoriteDons !== null) {
        const fetchFavoriteDons = allFavoriteDons.map((item) => item.dons)
        const favoriteIds = fetchFavoriteDons.map((item) => item.id)
        // setFavoriteDons(fetchFavoriteDons);
        setFavoriteDonsIDs(favoriteIds)
      }

      // 注文履歴
      // カウント数を取得・更新
      const donIdCounts = {}
      allOrder.forEach((order) => {
        const donId = order.don_id
        donIdCounts[donId] = (donIdCounts[donId] || 0) + 1
      })

      const allOrderAddCount = allOrder.map((order) => {
        const donId = order.don_id
        const count = donIdCounts[donId]
        return { ...order, count }
      })

      // 最新の注文データだけにソート
      const latestOrdersMap = new Map()
      allOrderAddCount.forEach((order) => {
        const existingOrder = latestOrdersMap.get(order.don_id)
        const formattedDate = convertFormattedDate(order.updated_at)
        order.updated_at = formattedDate
        if (
          !existingOrder ||
          new Date(order.updated_at) > new Date(existingOrder.updated_at)
        ) {
          latestOrdersMap.set(order.don_id, order)
        }
      })

      const latestOrders = Array.from(latestOrdersMap.values())
      // console.log("latestOrders", latestOrders);
      setOrder(latestOrders)
    } catch (error) {
      console.error('エラーが発生しました', error)
    } finally {
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // dons取得後、各プロパティを付与
  useEffect(() => {
    if (dons) {
      // favoriteプロパティを付与
      const allDonsAddFavorite = dons.map((don) => {
        const isFavorite = favoriteDonsIDs.includes(don.id)
        return { ...don, favorite: isFavorite }
      })

      // 履歴と注文回数プロパティを追加
      const allDonsAddOrder = allDonsAddFavorite.map((don) => {
        const orderIds = order.map((don) => don.don_id)
        // console.log(orderIds);

        if (orderIds.includes(don.id)) {
          const targetId = don.id
          const targetOrder = order.find((don) => don.don_id === targetId)

          return { ...don, order: targetOrder }
        } else {
          return { ...don, order: {} }
        }
      })

      // console.log("allDonsAddOrder", allDonsAddOrder);

      setAllData(allDonsAddOrder)
      setFullDons(allDonsAddOrder)
    }
  }, [dons, favoriteDonsIDs, order])

  return { dons, favoriteDonsIDs, order, allData, fetchData }
}

export default useFetchDonsData
