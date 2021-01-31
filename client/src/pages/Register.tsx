import React, { useState } from 'react';
import { useRegisterMutation } from '../generated/graphql';
import { RouteComponentProps } from 'react-router-dom';

const Register: React.FC<RouteComponentProps> = ({ history }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [register] = useRegisterMutation();

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();

        console.log('FORM SUBMITTED');

        const response = await register({
          variables: {
            username,
            password,
          },
        });

        if (response && response.data?.register) {
          history.push('/');
        } else {
          console.log('errors:', response.errors);
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
      <button type='submit'> Register</button>
    </form>
  );
};

export default Register;
