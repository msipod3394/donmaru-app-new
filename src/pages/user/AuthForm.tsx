import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ButtonRounded } from '@/components/atoms/buttons/ButtonRounded';
import { FormControl, FormLabel, FormErrorMessage, Stack } from '@chakra-ui/react';
import SBaseInput from '@/components/atoms/input/BaseInput';
import { AuthFormInput } from '@/types/SignUpFormInput';
import { AuthType } from '@/shared/utils/authAction';

type Props = {
  onSubmit: (data: AuthFormInput) => void;
  submitMessage: string;
};

const AuthForm: React.FC<Props> = ({ onSubmit, submitMessage }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<AuthType>({ criteriaMode: 'all' });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing='2rem' mt='1rem' mb='4rem'>
        <FormControl isInvalid={!!errors.email}>
          <FormLabel>メールアドレス</FormLabel>
          <SBaseInput
            placeholder='メールアドレス'
            value={email}
            onChange={handleEmailChange}
          />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.password}>
          <FormLabel>パスワード</FormLabel>
          <SBaseInput
            placeholder='パスワード'
            type='password'
            value={password}
            onChange={handlePasswordChange}
          />
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>
      </Stack>
      <ButtonRounded type='submit' className='isDark'>
        {submitMessage}
      </ButtonRounded>
    </form>
  );
};

export default AuthForm;
