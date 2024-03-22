import { useState, useEffect } from 'react'
import { getAllIngredients } from '@/hooks/supabaseFunctions'

export function useFetchNetaData() {
  // ローディング
  const [loading, setLoading] = useState(false)

  // ネタデータ管理
  const [ingredients, setIngredients] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ローディング開始
        setLoading(true)

        // データ取得
        const [getFetchData] = await Promise.all([getAllIngredients()])

        // ステート更新
        setIngredients(getFetchData)

        // ローディング解除
        setLoading(false)
      } catch (error) {
        console.error('エラーが発生しました', error)
        setLoading(false)
      }
    }

    fetchData() // 関数実行
  }, [])

  return { loading, ingredients }
}
