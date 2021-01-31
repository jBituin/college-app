import React, { useState } from 'react';
import { useLoginMutation } from '../generated/graphql';
import { RouteComponentProps } from 'react-router-dom';
import { setAccessToken } from '../accessToken';

const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login] = useLoginMutation();

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();

        console.log('FORM SUBMITTED');

        const response = await login({
          variables: {
            username,
            password,
          },
        });

        if (response && response.data) {
          console.log('response', response);
          console.log('response.data', response.data);
          setAccessToken(response.data.login.accessToken);
        } else {
          console.log('errors:', response);
        }
      }}
    >
      <div>
        <input
          value={username}
          type='username'
          placeholder='username'
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
      </div>
      <div>
        <input
          value={password}
          placeholder='password'
          type='password'
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <button type='submit'> Login</button>
    </form>
  );
};

export default Login;
