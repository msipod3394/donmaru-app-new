import { useAddDislikesMutation } from "@/gql/graphql"

export const addDislikesMutationHandler = () => {
  // 苦手ネタ追加
  const [addDislikeMutation] = useAddDislikesMutation()
}
