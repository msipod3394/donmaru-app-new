import { useEffect, useState } from 'react'

export function useLoadingState() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false)
    console.log("ローディング終了");
  }, [])

  return loading
}
