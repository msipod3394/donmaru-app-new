// 日付をフォーマットする

import { Scalars } from '@/gql/graphql'

export const convertFormattedDate = (
  isoTimestamp: string | number | Date | Scalars['ISO8601DateTime']['output'],
) => {
  const dateObject = new Date(isoTimestamp)

  // 年月日を取得
  const year = dateObject.getFullYear()
  const month = (dateObject.getMonth() + 1).toString().padStart(2, '0')
  const day = dateObject.getDate().toString().padStart(2, '0')

  // フォーマットした日付
  const formattedDate = `${year}/${month}/${day}`
  return formattedDate
}

export const formatDate = (dateString: string | number | Date) => {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0') // 月は0から始まるため +1
  const day = date.getDate().toString().padStart(2, '0')

  return `${year}年${month}月${day}日`
}
