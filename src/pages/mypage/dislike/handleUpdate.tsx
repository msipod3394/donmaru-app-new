import { AddDislikesMutation, DeleteDislikeMutation, Exact } from '@/gql/graphql'
import {
  ApolloCache,
  DefaultContext,
  FetchResult,
  MutationFunctionOptions,
} from '@apollo/client'

export async function handleUpdate(
  user: { id: string },
  addIds: string[],
  deleteIds: string[],

  addDislikeMutation: (
    options:
      | MutationFunctionOptions<
          AddDislikesMutation,
          Exact<{ ingredientIds: string | string[]; id: string }>,
          DefaultContext,
          ApolloCache<any>
        >
      | undefined,
  ) => Promise<FetchResult<AddDislikesMutation>>,
  deleteDislikeMutation: (
    options:
      | MutationFunctionOptions<
          DeleteDislikeMutation,
          Exact<{ ingredientIds: string | string[]; id: string }>,
          DefaultContext,
          ApolloCache<any>
        >
      | undefined,
  ) => Promise<FetchResult<DeleteDislikeMutation>>,
): Promise<boolean> {
  const userId = user.id.toString()

  try {
    await Promise.all([
      addDislikeMutation({ variables: { ingredientIds: addIds, id: userId } }),
      deleteDislikeMutation({ variables: { ingredientIds: deleteIds, id: userId } }),
    ])

    return true
  } catch (error) {
    console.error('エラー:', error)
    return false
  }

  // return Promise.all([
  //   addDislikeMutation({
  //     variables: { ingredientIds: addIds, id: userId },
  //   }),
  //   deleteDislikeMutation({
  //     variables: { ingredientIds: deleteIds, id: userId },
  //   }),
  // ])
  //   .then(() => {
  //     // console.log('更新成功')
  //     // alert('苦手ネタを更新しました！')

  //     // ユーザーの苦手ネタを再取得
  //     // if (userId) {
  //     //   refetchDislikesByUserId({ id: userId })
  //     // }

  //     return true
  //   })
  //   .catch((error) => {
  //     console.error('エラー:', error)
  //     return false
  //   })
}
