import React, { useCallback, useEffect, useState } from 'react'
import { useCheckLogin } from '@/hooks/useLoginCheck'
import { useFetchDislikes } from '@/hooks/fetch/useFetchDislikes'
import { PageTitle } from '@/components/atoms/Texts/PageTitle'
import { ButtonRounded } from '@/components/atoms/Buttons/ButtonRounded'
import { NetaCheckbox } from '@/components/atoms/Checkbox/NetaCheckbox'
import { handleUpdate } from './handleUpdate'
import {
  Dislike,
  Ingredient,
  useAddDislikeMutation,
  useAddDislikesMutation,
  useFetchDislikeByEmailQuery,
  useFetchIngredientsQuery,
  User,
} from '@/gql/graphql'

export default function PageDislike() {
  // ユーザー情報を取得
  const { getUser } = useCheckLogin()
  const [user, setUser] = useState<User>()

  // 苦手ネタをステート管理
  const [registeredDislikes, setRegisteredDislikes] = useState<string[]>([])

  // 苦手ネタの取得
  const { fetchDislikes, dislikeLoading, dislikeError } = useFetchDislikes()

  // 全てのネタ情報を取得
  const { data: fetchIngs, loading, error } = useFetchIngredientsQuery()

  // チェックが入っているネタを管理
  const [isChecked, setIsChecked] = useState<number[]>([])

  // addDislikeMutation と data を抽出
  const [addDislikeMutation, { data }] = useAddDislikesMutation()

  // const onSubmit = async () => {
  //   try {
  //     const result = await addDislikeMutation({
  //       variables: { ingredientId: '8', email: "msipod3394@gmail.com" },
  //     })
  //     console.log(result)
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  // チェックボックスの更新
  const handleCheckbox = useCallback((id: number) => {
    setIsChecked((prevArray) => {
      const newArray = prevArray.includes(id)
        ? prevArray.filter((item) => item !== id)
        : [...prevArray, id]
      return newArray
    })
  }, [])

  // GQLから苦手ネタを取得
  const { data: dislikeData, refetch: refetchDislikesByUserEmail } =
    useFetchDislikeByEmailQuery({
      variables: { email: user && user.email ? user.email : null },
      skip: !user,
    })

  // 苦手ネタ更新
  const onSubmit = useCallback(() => {
    if (user) {
      handleUpdate(isChecked, user, registeredDislikes, addDislikeMutation)
    }
  }, [isChecked])

  // ユーザー情報を取得実行
  useEffect(() => {
    setUser(getUser)
  }, [getUser])

  useEffect(() => {
    console.log('isChecked', isChecked)
  }, [isChecked])

  // 苦手ネタをisCheckedにセット（既存チェック）
  useEffect(() => {
    if (fetchDislikes) {
      const registeredDislike: string[] = fetchDislikes.map((item) => {
        return item.ingredient.id
      })
      setIsChecked(registeredDislike)
    }

    // ステートにセット（Update時に使用）
    const filterDislikes: string[] = Array.from(fetchDislikes).map((item) => {
      return item.ingredient.id
    })
    setRegisteredDislikes(filterDislikes)
  }, [fetchDislikes])

  return (
    <>
      <PageTitle title='苦手ネタ管理' />
      {fetchIngs &&
        Object.values(fetchIngs).map((fetchIng: Ingredient[]) => {
          return Object.values(fetchIng).map((item: Ingredient) => {
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
      <ButtonRounded onClick={onSubmit} className='isDark'>
        更新
      </ButtonRounded>
    </>
  )
}
