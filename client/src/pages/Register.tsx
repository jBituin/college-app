import React, { useState } from 'react';
import { useRegisterMutation } from '../generated/graphql';
import { RouteComponentProps } from 'react-router-dom';
import AuthForm from '../components/AuthForm';

const Register: React.FC<RouteComponentProps> = ({ history }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [register] = useRegisterMutation();

  const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUsername(e.currentTarget.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.currentTarget.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await register({
      variables: {
        username,
        password,
      },
    });

    if (response && response.data) {
      history.push('/');
    } else {
      console.log('errors:', response);
    }
  };

  return (
    <AuthForm
      onSubmit={onSubmit}
      onChangePassword={onChangePassword}
      onChangeUsername={onChangeUsername}
      headingText="Register"
      buttonText="Sign up"
    ></AuthForm>
  );
};

export default Register;
