import React, { useCallback, useEffect, useState } from 'react'
import {
  Ingredient,
  useAddDislikesMutation,
  useDeleteDislikeMutation,
  useFetchDislikeByEmailQuery,
  useFetchIngredientsQuery,
} from '@/gql/graphql'
import { useUserContext } from '@/contexts/UserContext'
import { PageTitle } from '@/components/atoms/Texts/PageTitle'
import { ButtonRounded } from '@/components/atoms/Buttons/ButtonRounded'
import { NetaCheckbox } from '@/components/atoms/Checkbox/NetaCheckbox'
import { handleUpdate } from './handleUpdate'
import { LoadingIndicator } from '@/components/atoms/LoadingIndicator'

export default function PageDislike() {
  // ユーザー情報を取得
  const [user, setUser] = useUserContext()

  // 苦手ネタをステート管理
  const [registeredDislikes, setRegisteredDislikes] = useState<string[]>([])

  // 全てのネタ情報を取得
  const { data: ingredients, loading, error } = useFetchIngredientsQuery()

  // チェックが入っているネタを管理
  const [isChecked, setIsChecked] = useState<string[]>([])

  // GQLから苦手ネタを取得
  const { data: dislikes, refetch: refetchDislikesByUserEmail } =
    useFetchDislikeByEmailQuery({
      variables: { email: user && user.email ? user.email : null },
      skip: !user,
    })

  // 苦手ネタ追加
  const [addDislikeMutation] = useAddDislikesMutation()

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
        return item.ingredient.id
      })
      setIsChecked(registeredDislike)

      // ステートにセット（Update時に使用）
      const filterDislikes: string[] = dislikes.dislikes.map((item) => {
        return item.ingredient.id
      })

      // 苦手ネタのステート更新
      setRegisteredDislikes(filterDislikes)
    }
  }, [dislikes])

  // チェックボックスの更新
  const handleCheckbox = useCallback((id: number) => {
    setIsChecked((prevArray) => {
      const newArray = prevArray.includes(id)
        ? prevArray.filter((item) => item !== id)
        : [...prevArray, id]
      return newArray
    })
  }, [])

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
      // 苦手ネタの更新処理を実行
      await handleUpdate(
        user,
        addIds,
        deleteIds,
        addDislikeMutation,
        addDeleteMutation,
        refetchDislikesByUserEmail,
      )
    }
  }, [
    user,
    addIds,
    deleteIds,
    addDislikeMutation,
    addDeleteMutation,
    refetchDislikesByUserEmail,
  ])

  return (
    <>
      <PageTitle title='苦手ネタ管理' />
      {loading ? (
        <LoadingIndicator />
      ) : (
        ingredients &&
        Object.values(ingredients).map((ingredient: Ingredient[] | undefined) => {
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
        })
      )}
      <ButtonRounded onClick={onSubmit} className='isDark'>
        更新
      </ButtonRounded>
    </>
  )
}
