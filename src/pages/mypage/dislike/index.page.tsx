import React, { useCallback, useEffect, useState } from 'react'
import {
  Ingredient,
  useAddDislikesMutation,
  useDeleteDislikeMutation,
  useFetchDislikeByIdQuery,
  useFetchIngredientsQuery,
} from '@/gql/graphql'
import { HStack, VStack } from '@chakra-ui/react'
import { useUserContext } from '@/contexts/UserContext'
import { PageTitle } from '@/components/atoms/texts/PageTitle'
import { ButtonRounded } from '@/components/atoms/buttons/ButtonRounded'
import { NetaCheckbox } from '@/components/atoms/checkbox/NetaCheckbox'
import { LoadingIndicator } from '@/components/atoms/LoadingIndicator'
import { PageDescription } from '@/components/atoms/texts/PageDescription'
import { handleUpdate } from './handleUpdate'

export default function PageDislike() {
  // ユーザー情報をセット
  const [user] = useUserContext()

  // 苦手ネタをステート管理
  const [registeredDislikes, setRegisteredDislikes] = useState<string[]>([])

  // 全てのネタ情報を取得
  const { data: ingredients, loading, error } = useFetchIngredientsQuery()

  // チェックが入っているネタを管理
  const [isChecked, setIsChecked] = useState<string[]>([])

  // 苦手ネタを取得
  const { data: dislikes, refetch: refetchDislikesByUserId } = useFetchDislikeByIdQuery({
    variables: { id: user && user.id ? user.id.toString() : undefined },
    skip: !user,
  })

  // 苦手ネタ追加
  const [deleteDislikeMutation] = useAddDislikesMutation()

  // 苦手ネタ削除
  const [addDeleteMutation] = useDeleteDislikeMutation()

  // 削除する配列
  const [deleteIds, setDeleteIds] = useState<string[]>([])

  // 登録する配列
  const [addIds, setAddIds] = useState<string[]>([])

  // 苦手ネタをisCheckedにセット（既存チェック）
  useEffect(() => {
    if (dislikes) {
      const registeredDislike: string[] = dislikes.dislikes.map((item) => {
        return item.ingredient.id.toString()
      })

      // console.log('registeredDislike', registeredDislike)

      setIsChecked(registeredDislike)

      // ステートにセット（Update時に使用）
      const filterDislikes: string[] = dislikes.dislikes.map((item) => {
        return item.ingredient.id.toString()
      })

      // 苦手ネタのステート更新
      setRegisteredDislikes(filterDislikes)
    }
  }, [dislikes])

  // チェックボックスの更新
  const handleCheckbox = useCallback((id: string) => {
    setIsChecked((prevArray) => {
      const newArray = prevArray.includes(id)
        ? prevArray.filter((item) => item !== id)
        : [...prevArray, id]
      return newArray
    })
  }, [])

  // Review: supabaseだとこの方法しかなかったが、railsの場合はチェックがついたものと外されたもののidをバックエンドに渡してバックエンド上でロジックを組んで更新するのが良いです！

  useEffect(() => {
    // チェックがついている・登録されていないIDを抽出（苦手ネタ追加）
    let removedDislikes = registeredDislikes.filter((item) => !isChecked.includes(item))
    setDeleteIds(removedDislikes)

    // チェックがない・登録されているIDを抽出（苦手ネタ削除）
    let uniqueDislikes = isChecked.filter((item) => !registeredDislikes.includes(item))

    setAddIds(uniqueDislikes)
  }, [isChecked, registeredDislikes])

  // 苦手ネタ更新
  const onSubmit = useCallback(async () => {
    if (user) {
      try {
        // 苦手ネタの更新処理を実行
        const success = await handleUpdate(
          user,
          addIds,
          deleteIds,
          deleteDislikeMutation,
          addDeleteMutation,
        )

        // 成功したら
        if (success) {
          console.log('更新成功')
          alert('苦手ネタを更新しました！')

          // 苦手ネタを再取得
          refetchDislikesByUserId({ id: user.id })
        } else {
          console.log('error')
        }
      } catch (error) {
        console.error('エラー:', error)
      }
    }
  }, [user, addIds, deleteIds, deleteDislikeMutation, addDeleteMutation])

  return (
    <>
      <PageTitle title='苦手ネタ管理' />
      {loading ? (
        <LoadingIndicator />
      ) : (
        <>
          <PageDescription>
            苦手ネタを登録すると、
            <br />
            おまかせガチャで苦手ネタを除いた丼で
            <br />
            ガチャするよ！
          </PageDescription>
          <VStack mb={10} flexDirection='row' flexWrap='wrap' alignItems='flex-start'>
            {ingredients &&
              Object.values(ingredients).map((ingredient) => {
                return Object.values(ingredient).map((item: Ingredient) => {
                  return (
                    <NetaCheckbox
                      key={item.id}
                      id={item.id}
                      label={item.name}
                      isChecked={isChecked.includes(item.id)}
                      onChange={handleCheckbox}
                    />
                  )
                })
              })}
          </VStack>
        </>
      )}
      <ButtonRounded onClick={onSubmit} className='isDark'>
        更新
      </ButtonRounded>
    </>
  )
}
