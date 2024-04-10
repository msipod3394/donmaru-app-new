import {
  AddDislikesMutation,
  DeleteDislikeMutation,
  Exact,
  FetchDislikeByEmailQuery,
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
  user: { email: string },
  addIds: string[],
  deleteIds: string[],
  addDislikeMutation: {
    (
      options?:
        | MutationFunctionOptions<
            AddDislikesMutation,
            Exact<{ ingredientIds: string | string[]; email: string }>,
            DefaultContext,
            ApolloCache<any>
          >
        | undefined,
    ): Promise<FetchResult<AddDislikesMutation>>
    (arg0: { variables: { ingredientIds: string[]; email: string } }): any
  },
  addDeleteMutation: {
    (
      options?:
        | MutationFunctionOptions<
            DeleteDislikeMutation,
            Exact<{ ingredientIds: string | string[]; email: string }>,
            DefaultContext,
            ApolloCache<any>
          >
        | undefined,
    ): Promise<FetchResult<DeleteDislikeMutation>>
    (arg0: { variables: { ingredientIds: string[]; email: string } }): any
  },
  refetchDislikesByUserEmail: {
    (
      variables?: Partial<Exact<{ email?: InputMaybe<string> | undefined }>> | undefined,
    ): Promise<ApolloQueryResult<FetchDislikeByEmailQuery>>
    (arg0: { email: string }): void
  },
) {
  Promise.all([
    addDislikeMutation({ variables: { ingredientIds: addIds, email: user.email } }),
    addDeleteMutation({ variables: { ingredientIds: deleteIds, email: user.email } }),
  ])
    .then(() => {
      console.log('更新成功')
      alert('苦手ネタを更新しました！')

      // ユーザーの苦手ネタを再取得
      refetchDislikesByUserEmail({ email: user.email })
    })
    .catch((error) => {
      console.error('エラー:', error)
    })
}
