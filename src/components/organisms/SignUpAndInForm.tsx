import React from 'react'
import { ButtonRounded } from '@/components/atoms/Buttons/ButtonRounded'
import { BaseInput } from '@/components/atoms/Input/BaseInput'
import { SignUpFormInput } from '../../pages/signup/index.page'

// フォーム関連
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormControl, FormLabel, FormErrorMessage, Stack } from '@chakra-ui/react'

// バリデーションスキーマ
const schema = yup.object().shape({
  // name: yup.string().required("氏名は必須です"),
  email: yup
    .string()
    .email('有効なメールアドレスを入力してください')
    .required('メールアドレスは必須です'),
  password: yup
    .string()
    .min(6, 'パスワードは6文字以上で入力してください')
    .required('パスワードは必須です'),
})

interface Props {
  onSubmit: (data: SignUpFormInput) => void
  submitMessage: String
}

const SignUpForm: React.FC<Props> = ({ onSubmit, submitMessage }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormInput>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const submitHandler: SubmitHandler<SignUpFormInput> = (data) => {
    onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <Stack spacing='2rem' mt='1rem' mb='4rem'>
        <FormControl isInvalid={!!errors.email}>
          <FormLabel>メールアドレス</FormLabel>
          <BaseInput text='メールアドレス' register={register('email')} type='email' />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.password}>
          <FormLabel>パスワード</FormLabel>
          <BaseInput text='パスワード' register={register('password')} type='password' />
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>
      </Stack>
      <ButtonRounded type='submit' className='isDark'>
        {submitMessage}
      </ButtonRounded>
    </form>
  )
}

export default SignUpForm
