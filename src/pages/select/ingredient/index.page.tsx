import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { VStack } from '@chakra-ui/react'
import { ButtonRounded } from '@/components/atoms/buttons/ButtonRounded'
import { PageTitle } from '@/components/atoms/texts/PageTitle'
import { LoadingIndicator } from '@/components/atoms/LoadingIndicator'
import { NetaCheckbox } from '@/components/atoms/checkbox/NetaCheckbox'
import { PageDescription } from '@/components/atoms/texts/PageDescription'
import {
  useFetchIngredientsQuery,
  useGetItemsQuery,
  Ingredient,
  Item,
} from '@/gql/graphql'

export default function PageSelectIngredient() {
  const router = useRouter()

  const [ingredients, setIngredients] = useState<Ingredient[] | undefined>()
  const [items, setItems] = useState<Item[] | undefined>()
  const [selectNetas, setSelectNetas] = useState<Item[]>()

  // チェックされたネタID
  const [isChecked, setIsChecked] = useState<number[]>([])

  // ヒットした丼数
  const [hitCount, setHitCount] = useState<number>()

  // 全てのネタ情報を取得
  const { data: ingredientData, loading: ingredientLoading } = useFetchIngredientsQuery()

  // 全ての丼情報取得
  const { data: data_items, loading: itemLoading, error: itemError } = useGetItemsQuery()

  // ページ読み込み時にネタ情報と丼情報をセット
  useEffect(() => {
    if (ingredientData) {
      setIngredients(ingredientData.ingredients)
    }
    if (data_items) {
      setItems(data_items.items)
    }
  }, [ingredientData, data_items])

  // チェックボックスの更新
  const handleCheckbox = useCallback(
    (id: number) => {
      // チェックが入っているかどうかを判定
      const newIsChecked = isChecked.includes(id)
        ? isChecked.filter((item) => item !== id)
        : [...isChecked, id]
      setIsChecked(newIsChecked)
    },
    [isChecked],
  )

  // ガチャボタンクリック時の処理
  const clickShowResult = () => {
    if (selectNetas && selectNetas.length !== 0) {
      const randomIndex = Math.floor(Math.random() * selectNetas.length)
      const selectedObj = selectNetas[randomIndex]
      router.push(`/select/result/${selectedObj.id}`)
    }
  }

  // チェックボックスが更新されたら、該当する丼を都度検索
  useEffect(() => {
    if (items && isChecked.length > 0) {
      const filteredData = items.filter((item) => {
        const filteredIds = isChecked.filter((id) => {
          return item.ingredients.some((netaItem) => netaItem.id === id)
        })
        return filteredIds.length === isChecked.length
      })
      if (filteredData.length === 0) {
        console.log('要素がありません')
        setSelectNetas(filteredData)
        setHitCount(filteredData.length)
      } else {
        console.log('ヒットした丼数', filteredData.length)
        setSelectNetas(filteredData)
        setHitCount(filteredData.length)
      }
    } else {
      if (items) {
        setHitCount(items.length)
      }
    }
  }, [isChecked, items])

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
              : `該当 ${hitCount}個、ガチャしよう!`}
          </PageDescription>
          <VStack mb='2rem' alignItems='flex-start'>
            {ingredients &&
              ingredients.map((item) => {
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
