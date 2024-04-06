import { AddDislikeMutationVariables } from '@/gql/graphql'

export async function handleUpdate(
  isChecked: number[],
  user: { id: string },
  registeredDislikes: number[],
  addDislikeMutation: (variables: AddDislikeMutationVariables) => void,
) {
  console.log('registeredDislikes', registeredDislikes)
  console.log('isChecked', isChecked)

  const addRegisterItems = isChecked.filter((item) => !registeredDislikes.includes(item))
  console.log('addRegisterItems', addRegisterItems)

  const mutationVariablesList: AddDislikeMutationVariables[] = addRegisterItems.map(
    (ingredientId) => {
      return {
        ingredientId,
        // userId: user.id
        userId: 5,
      }
    },
  )

  // ミューテーションの呼び出し
  mutationVariablesList.forEach((variables) => {
    addDislikeMutation(variables)
  })
}
