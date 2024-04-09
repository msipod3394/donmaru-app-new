import { AddDislikeMutationVariables } from '@/gql/graphql'

export async function handleUpdate(
  isChecked: string[],
  user: { email: string },
  registeredDislikes: number[],
  addDislikeMutation: (variables: AddDislikeMutationVariables) => Promise<any>,
) {
  try {
    const result = await addDislikeMutation({
      variables: { ingredientIds: isChecked, email: 'msipod3394@gmail.com' },
    })
    console.log(result)
  } catch (error) {
    console.error(error)
  }
}
