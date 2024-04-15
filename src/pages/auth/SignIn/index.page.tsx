import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { FormControl, FormErrorMessage, FormLabel, Input, Stack } from '@chakra-ui/react'
import { onSignIn, AuthType } from '@/shared/utils/authAction'
import { PageTitle } from '@/components/atoms/texts/PageTitle'
import { TextLink } from '@/components/atoms/texts/TextLink'
import { ErrorText } from '@/components/atoms/texts/TextError'
import { ButtonRounded } from '@/components/atoms/buttons/ButtonRounded'
import SBaseInput from '@/components/atoms/input/BaseInput'
import { validation } from '@/shared/utils/validation'

const SignIn = () => {
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<AuthType>({ criteriaMode: 'all' })

  const onSubmit = useCallback(
    async (data: AuthType) => {
      try {
        const res = await onSignIn(data)
        // console.log('res:', res.user)

        // ローカルストレージにセット
        localStorage.setItem('user', JSON.stringify(res.user))

        // homeへ遷移
        alert('ログインに成功しました!')
        router.push('/home')
      } catch (error) {
        setErrorMessage(`エラーが発生しました:${error}`)
      }
    },
    [router],
  )

  return (
    <>
      <PageTitle title='ログイン' />

      {/* form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing='2rem' mt='1rem' mb='4rem'>
          <FormControl isInvalid={!!errors.email}>
            <FormLabel>メールアドレス</FormLabel>
            <SBaseInput
              {...register('email', {
                required: 'メールアドレスを入力してください',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: '有効なメールアドレスを入力してください',
                },
              })}
            />
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.password}>
            <FormLabel>パスワード</FormLabel>
            <SBaseInput
              type='password'
              {...register('password', {
                required: 'パスワードを入力してください',
                minLength: {
                  value: 4,
                  message: 'パスワードは4文字以上で入力してください',
                },
              })}
            />
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          </FormControl>
        </Stack>
        <ButtonRounded type='submit' className='isDark'>
          ログイン
        </ButtonRounded>
      </form>

      {/* エラー */}
      {errorMessage && <ErrorText>{errorMessage}</ErrorText>}

      {/* 新規登録はこちら */}
      <TextLink text='新規登録はこちら' url='/auth/SignUp' />
    </>
  )
}

export default SignIn
