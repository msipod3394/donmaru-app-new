import { useForm, SubmitHandler } from 'react-hook-form'
import { Link, Navigate, useNavigate, useOutletContext } from 'react-router-dom'
import { onSignIn, AuthType } from '@/shared/utils/authAction'
import { validation } from '@/shared/utils/validation'

const SignIn = () => {
  const navigate = useNavigate()
  const [isAuthorized] = useOutletContext<[boolean]>()
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<AuthType>({ criteriaMode: 'all' })

  const onSubmit: SubmitHandler<AuthType> = (data) => {
    void onSignIn(data).then(() => {
      navigate('/project')
    })
  }

  if (isAuthorized) return <Navigate to={'/project'} />

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p>Sign In</p>
        <label htmlFor='email'>メールアドレス</label>
        <input
          {...register('email', {
            required: validation.required,
            pattern: validation.pattern.email,
          })}
          errors={errors}
        />
        <label htmlFor='password'>パスワード</label>
        <input
          label='パスワード'
          type='password'
          {...register('password', {
            required: validation.required,
            pattern: validation.pattern.password,
          })}
          errors={errors}
        />
        <button type='submit'>Sign In</button>
      </form>
    </>
  )
}

export default SignIn
