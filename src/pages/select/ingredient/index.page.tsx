import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { VStack } from '@chakra-ui/react'
import { useFetchItems } from '@/hooks/fetch/useFetchItems'
import { useFetchNetas } from '@/hooks/fetch/useFetchNetas'
import { ButtonRounded } from '@/components/atoms/Buttons/ButtonRounded'
import { PageTitle } from '@/components/atoms/Texts/PageTitle'
import { LoadingIndicator } from '@/components/atoms/LoadingIndicator'
import { NetaCheckbox } from '@/components/atoms/Checkbox/NetaCheckbox'
import { PageDescription } from '@/components/atoms/Texts/PageDescription'
import { DBDons } from '@/types/global_db.types'

export default function PageSelectIngredient() {
  const router = useRouter()

  // チェックが入っているネタを管理
  const [selectNetas, setSelectNetas] = useState<DBDons[]>()

  // チェックが入っているネタを管理
  const [isChecked, setIsChecked] = useState<number[]>([])

  // ヒットした数の状態とその更新関数を追加
  const [hitCount, setHitCount] = useState<number>(0)

  // 全てのネタ情報を取得
  const { fetchNetas } = useFetchNetas()

  // 全ての丼データ取得
  const { fetchItems, loading } = useFetchItems()

  // チェックボックスの更新
  const handleCheckbox = useCallback((id: number) => {
    setIsChecked((prevArray) => {
      const newArray = prevArray.includes(id)
        ? prevArray.filter((item) => item !== id)
        : [...prevArray, id]
      return newArray
    })
  }, [])

  // 結果画面へ遷移
  const clickShowResult = () => {
    if (selectNetas && selectNetas.length !== 0) {
      const randomIndex = Math.floor(Math.random() * selectNetas.length)
      const selectedObj = selectNetas[randomIndex]
      router.push(`/select/result/${selectedObj.id}`)
    }
  }

  // チェックボックスが更新されたら、該当する丼を都度検索
  useEffect(() => {
    const filteredData = fetchItems.filter((item) => {
      const filteredIds = isChecked.filter((id) => {
        return item.dons_netas.some((netaItem) => netaItem.netas.id === id)
      })
      return filteredIds.length === isChecked.length
    })

    if (filteredData.length === 0) {
      console.log('要素がありません')
      setHitCount(filteredData.length)
    } else {
      console.log(filteredData)
      console.log('ヒットした丼数', filteredData.length)
      setSelectNetas(filteredData)
      setHitCount(filteredData.length)
    }
  }, [isChecked])

  // Hit数の初期値を設定
  useEffect(() => {
    setHitCount(fetchItems.length)
  }, [fetchItems])

  return (
    <>
      <PageTitle title='具材を選んでガチャ' />
      <PageDescription>
        {hitCount === 0 ? '該当する丼がないよ😖' : `該当 ${hitCount}個、ガチャしよう✊`}
      </PageDescription>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <VStack mb='2rem' alignItems='flex-start'>
          {fetchNetas &&
            Object.values(fetchNetas).map((item) => {
              return (
                <NetaCheckbox
                  key={item.id}
                  id={item.id}
                  label={item.name}
                  isChecked={isChecked.includes(item.id)}
                  onChange={handleCheckbox}
                />
              )
            })}
        </VStack>
      )}
      <ButtonRounded onClick={clickShowResult} className='isDark'>
        ガチャする
      </ButtonRounded>
    </>
  )
}
