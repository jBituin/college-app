import React, { useState, SyntheticEvent } from 'react';
import { useLoginMutation } from '../generated/graphql';
import { RouteComponentProps } from 'react-router-dom';
import { setAccessToken } from '../accessToken';
import AuthForm from '../components/AuthForm';

const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const [username, setUsername] = useState('joms');
  const [password, setPassword] = useState('joms');
  const [login] = useLoginMutation();

  const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUsername(e.currentTarget.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.currentTarget.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await login({
      variables: {
        username,
        password,
      },
    });

    if (response && response.data) {
      setAccessToken(response.data.login.accessToken);
      history.push('/my-info');
    } else {
      console.log('errors:', response);
    }
  };

  return (
    <AuthForm
      onChangePassword={onChangePassword}
      onChangeUsername={onChangeUsername}
      onSubmit={onSubmit}
      headingText="Login"
      buttonText="Sign in"
    ></AuthForm>
  );
};

export default Login;
