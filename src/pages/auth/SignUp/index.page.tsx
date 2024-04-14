import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Link, Navigate, useNavigate, useOutletContext } from 'react-router-dom'
// import Input from '../../../shared/components/Input'
import { onSignUp, SignUpAuthType } from '@/shared/utils/authAction'
import { validation } from '@/shared/utils/validation'

const SignUp = () => {
  const navigate = useNavigate()
  const [isAuthorized] = useOutletContext<[boolean]>()
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<SignUpAuthType>({ criteriaMode: 'all' })
  const password = watch('password', '')

  const onSubmit: SubmitHandler<SignUpAuthType> = (data) => {
    void onSignUp(data).then(() => {
      navigate('/auth/signin')
    })
  }

  if (isAuthorized) return <Navigate to='/project' />

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p>Sign Up</p>
        <label htmlFor='email' />
        <input
          {...register('email', {
            required: validation.required,
            pattern: validation.pattern.email,
          })}
          errors={errors}
        />
        <label htmlFor='password' />
        <input
          type='password'
          {...register('password', {
            required: validation.required,
            pattern: validation.pattern.password,
          })}
          errors={errors}
        />
        <label htmlFor='passwordConfirmation' />
        <input
          label='パスワード確認'
          type='password'
          {...register('passwordConfirmation', {
            required: validation.required,
            validate: (value) => validation.validate.confirm(password, value),
          })}
          errors={errors}
        />
        <button type='submit'>Sign Up</button>
      </form>
    </>
  )
}

export default SignUp
