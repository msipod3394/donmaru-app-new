import {
  AddDislikesMutation,
  DeleteDislikeMutation,
  Exact,
  FetchDislikeByIdQuery,
  InputMaybe,
} from '@/gql/graphql'
import {
  ApolloCache,
  ApolloQueryResult,
  DefaultContext,
  FetchResult,
  MutationFunctionOptions,
} from '@apollo/client'

export function handleUpdate(
  user: { id: string },
  addIds: string[],
  deleteIds: string[],
  addDislikeMutation: {
    (
      options?:
        | MutationFunctionOptions<
            AddDislikesMutation,
            Exact<{ ingredientIds: string | string[]; id: string }>,
            DefaultContext,
            ApolloCache<any>
          >
        | undefined,
    ): Promise<FetchResult<AddDislikesMutation>>
    (arg0: { variables: { ingredientIds: string[]; userId: any } }): any
  },
  deleteDislikeMutation: {
    (
      options?:
        | MutationFunctionOptions<
            DeleteDislikeMutation,
            Exact<{ ingredientIds: string | string[]; id: string }>,
            DefaultContext,
            ApolloCache<any>
          >
        | undefined,
    ): Promise<FetchResult<DeleteDislikeMutation>>
    (arg0: { variables: { ingredientIds: string[]; userId: any } }): any
  },
  refetchDislikesByUserId: {
    (
      variables?: Partial<Exact<{ id?: InputMaybe<string> | undefined }>> | undefined,
    ): Promise<ApolloQueryResult<FetchDislikeByIdQuery>>
    (arg0: { userId: any }): void
  },
) {
  const userId = user.id.toString()
  console.log('userId', userId)
  console.log('addIds', typeof addIds)
  console.log('deleteIds', deleteIds)

  Promise.all([
    addDislikeMutation({
      variables: { ingredientIds: addIds, id: userId },
    }),
    deleteDislikeMutation({
      variables: { ingredientIds: deleteIds, id: userId },
    }),
  ])
    .then(() => {
      console.log('更新成功')
      alert('苦手ネタを更新しました！')

      // ユーザーの苦手ネタを再取得
      refetchDislikesByUserId({ id: userId })
    })
    .catch((error) => {
      console.error('エラー:', error)
    })
}
