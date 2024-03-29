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
export const useFilterItems = (
  items: formattedData[],
  order: FilterData[],
  fetchFavorites: FetchFavorites[],
) => {
  // 注文履歴、IDだけの配列
  const orderIdArray = order.map((item) => item.don_id)

  // お気に入り、IDだけの配列
  const faviriteDonIdArray = fetchFavorites.map((item) => item.don_id)

  /**
   * 最新注文日・注文回数・お気に入りかどうかの
   * プロパティを追加
   */
  return items.map((item) => {
    // プロパティ初期値
    let order_latest = ''
    let count = 0
    let favorite = faviriteDonIdArray.includes(item.id)

    // 過去に注文があるかをチェック
    const targetIdIndex = orderIdArray.indexOf(item.id)
    if (targetIdIndex !== -1) {
      const targetItem = order[targetIdIndex]
      order_latest = convertFormattedDate(targetItem.updated_at)
      count = targetItem.count
    }

    // プロパティを追加
    return { ...item, order_latest, count, favorite }
  })
}
