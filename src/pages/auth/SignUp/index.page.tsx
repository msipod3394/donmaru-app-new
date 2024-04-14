import { useForm, SubmitHandler } from 'react-hook-form'
import { onSignUp, AuthType } from '@/shared/utils/authAction'
import { validation } from '@/shared/utils/validation'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'

const SignUp = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<AuthType>({ criteriaMode: 'all' })
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = useCallback(async () => {
    await onSignUp({
      email,
      password,
    }).then(() => {
      router.push('/home')
    })
  }, [router, email, password])

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p>Sign In</p>
        <label htmlFor='email'>メールアドレス</label>
        <input placeholder="メアド" onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor='password'>パスワード</label>
        <input
          placeholder='パスワード'
          type='password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={onSubmit}>Sign Un</button>
      </form>
    </>
  )
}

export default SignUp
