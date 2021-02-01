import React, { useState } from 'react';
import { useRegisterMutation } from '../generated/graphql';
import { RouteComponentProps } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { useToast } from '@chakra-ui/react';

const Register: React.FC<RouteComponentProps> = ({ history }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();
  const [register] = useRegisterMutation();

  const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUsername(e.currentTarget.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.currentTarget.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await register({
        variables: {
          username,
          password,
        },
      });

      if (response && response.data) {
        toast({
          title: 'Account created.',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
        history.push('/login');
      } else {
        console.log('errors:', response);
      }
    } catch (error) {
      let message = 'Something went wrong. Please try again';
      if (JSON.stringify(error).includes('E11000')) {
        message = 'Username already exists.';
      }
      toast({
        title: message,
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <AuthForm
      onSubmit={onSubmit}
      onChangePassword={onChangePassword}
      onChangeUsername={onChangeUsername}
      username={username}
      password={password}
      headingText="Register"
      buttonText="Sign up"
    ></AuthForm>
  );
};

export default Register;
