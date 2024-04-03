import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { VStack } from '@chakra-ui/react'
import { ButtonRounded } from '@/components/atoms/Buttons/ButtonRounded'
import { PageTitle } from '@/components/atoms/Texts/PageTitle'
import { LoadingIndicator } from '@/components/atoms/LoadingIndicator'
import { NetaCheckbox } from '@/components/atoms/Checkbox/NetaCheckbox'
import { PageDescription } from '@/components/atoms/Texts/PageDescription'
import { DBDons } from '@/types/global_db.types'
import { useGetIngredientsQuery, useGetItemsQuery, Ingredient, Item } from '@/gql/graphql'

export default function PageSelectIngredient() {
  const router = useRouter()

  // ネタ情報
  const [ingredients, setIngredients] = useState<Ingredient[]>()
  const [items, setItems] = useState<Item[]>()

  // チェックが入っているネタを管理
  const [selectNetas, setSelectNetas] = useState<DBDons[]>()

  // チェックが入っているネタを管理
  const [isChecked, setIsChecked] = useState<number[]>([])

  // ヒットした数の状態とその更新関数を追加
  const [hitCount, setHitCount] = useState<number>(0)

  // 全てのネタ情報を取得
  const {
    data: data_ingredients,
    loading: ingredientLoading,
    error: ingredientError,
  } = useGetIngredientsQuery()
  // console.log('ネタ情報', data_ingredients.ingredients)

  // 全ての丼情報取得
  const { data: data_items, loading: itemLoading, error: itemError } = useGetItemsQuery()
  // console.log('丼情報', data_items)

  useEffect(() => {
    if (data_ingredients) {
      setIngredients(data_ingredients.ingredients)
    }
    if (data_items) {
      setItems(data_items.items)
    }
  }, [ingredientLoading, itemLoading])

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
    console.log(ingredients)
    console.log(items)
    console.log(isChecked)

    if (items && isChecked.length > 0) {
      const filteredData = items.filter((item) => {
        const filteredIds = isChecked.filter((id) => {
          return item.ingredients.some((netaItem) => netaItem.id === id)
        })
        console.log(filteredIds)
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
    }
  }, [isChecked])

  // Hit数の初期値を設定
  useEffect(() => {    
    if (items) {
      setHitCount(items.length)
    }
  }, [items])

  return (
    <>
      <PageTitle title='具材を選んでガチャ' />
      {ingredientLoading && itemLoading ? (
        <LoadingIndicator />
      ) : (
        <>
          <PageDescription>
            {hitCount === 0
              ? '該当する丼がないよ😖'
              : `該当 ${hitCount}個、ガチャしよう✊`}
          </PageDescription>
          <VStack mb='2rem' alignItems='flex-start'>
            {ingredients &&
              Object.values(ingredients).map((item) => {
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
        </>
      )}
      <ButtonRounded onClick={clickShowResult} className='isDark'>
        ガチャする
      </ButtonRounded>
    </>
  )
}
