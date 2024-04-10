import { Favorite, Item, Order } from '@/gql/graphql'
import { convertFormattedDate } from '@/hooks/convertFormattedDate'
import { formattedData } from '@/types/formattedData'
import { DBDons } from '@/types/global_db.types'

type FilterData = {
  don_id: number
  updated_at: string
  count: number
}

type FetchFavorites = {
  id: number
  created_at: string
  updated_at: string
  don_id: number
  dons: DBDons[]
  user_id: string
}

// アイテムをフィルタリングする関数
export const useFilterItems = (items: Item[], order: Order[], favorite: Favorite[]) => {
  console.log(order)
  console.log(favorite)

  let orderIdArray: number[] = []
  let faviriteDonIdArray: number[] = []

  // 注文履歴、IDだけの配列
  if (order) {
    const orderIdArray = order.map((item) => item.id)
    console.log(orderIdArray)
  }

  if (favorite) {
    // お気に入り、IDだけの配列
    const faviriteDonIdArray = favorite.map((item) => item.id)
    console.log(faviriteDonIdArray)
  }

  /**
   * 最新注文日・注文回数・お気に入りかどうかの
   * プロパティを追加
   */
  return items.map((item) => {
    console.log('item', item)
    console.log('orderIdArray', orderIdArray)
    console.log('faviriteDonIdArray', faviriteDonIdArray)

    // プロパティ初期値
    let order_latest = ''
    let count = 0
    let favorite = faviriteDonIdArray.includes(item.id)

    // 過去に注文があるかをチェック
    const targetIdIndex = orderIdArray.indexOf(item.id)
    if (targetIdIndex !== -1) {
      const targetItem = order[targetIdIndex]
      order_latest = convertFormattedDate(targetItem.updatedAt)
      count = targetItem.count
    }

    // プロパティを追加
    return { ...item, order_latest, count, favorite }
  })
}
