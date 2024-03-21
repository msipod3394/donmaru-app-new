// useOrderData.js

import { useState, useEffect } from 'react'
import { getAllOrder } from '@/hooks/supabaseFunctions'
import { convertFormattedDate } from '@/hooks/convertFormattedDate'

export function useOrderData(userId: string) {
  const [loading, setLoading] = useState(false)
  const [orderDons, setOrderDons] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [allOrder] = await Promise.all([getAllOrder(userId)])
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
        setOrderDons(latestOrders)
        setLoading(false)
      } catch (error) {
        console.error('エラーが発生しました', error)
        setLoading(false)
      }
    }

    fetchData()
  }, [userId])

  return { loading, orderDons }
}
