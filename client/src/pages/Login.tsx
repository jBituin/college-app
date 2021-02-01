import React, { useState } from 'react';
import { useLoginMutation } from '../generated/graphql';
import { RouteComponentProps } from 'react-router-dom';
import { setAccessToken } from '../accessToken';
import AuthForm from '../components/AuthForm';
import { useToast } from '@chakra-ui/react';

const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();
  const [login] = useLoginMutation();

  const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUsername(e.currentTarget.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.currentTarget.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await login({
        variables: {
          username,
          password,
        },
      });

      if (response && response.data) {
        setAccessToken(response.data.login.accessToken);
        history.push('/my-info');
      }
    } catch (err) {
      let message = 'Something went wrong. Please try again later.';
      const error = JSON.stringify(err);
      if (error.includes('Invalid Credentials'))
        message = 'Invalid credentials.';
      toast({
        title: message,
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <AuthForm
      onChangePassword={onChangePassword}
      onChangeUsername={onChangeUsername}
      onSubmit={onSubmit}
      username={username}
      password={password}
      headingText="Login"
      buttonText="Sign in"
    ></AuthForm>
  );
};

export default Login;
