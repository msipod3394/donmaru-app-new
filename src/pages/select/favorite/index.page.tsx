import { ButtonRounded } from '@/components/atoms/Buttons/ButtonRounded'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function PageFavorite() {
  const router = useRouter()

  // state
  const [dons, setDons] = useState()
  const [favoriteDons, setFavoriteDons] = useState()

  // 初回 データ取得
  useEffect(() => {
    setDons(fetchDons)
    setFavoriteDons(fetchFavoriteDons)
  }, [fetchFavoriteDons])

  useEffect(() => {
    console.log('dons', dons)
    console.log('favoriteDons', favoriteDons)
  }, [dons, favoriteDons])

  const onClickSelectDons = () => {
    if (favoriteDons && favoriteDons.length > 0) {
      const selectedId = Math.floor(Math.random() * favoriteDons.length)
      console.log(selectedId)

      // 結果画面へ遷移
      router.push(`/select/result/${dons[selectedId].id}`)
    }
  }

  return (
    <>
      {loading && <p>Loading...</p>}
      <ButtonRounded onClick={() => onClickSelectDons()}>ガチャする</ButtonRounded>
    </>
  )
}
