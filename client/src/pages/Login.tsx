import React, { useState, SyntheticEvent } from 'react';
import { useLoginMutation } from '../generated/graphql';
import { RouteComponentProps } from 'react-router-dom';
import { setAccessToken } from '../accessToken';
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
} from '@chakra-ui/react';

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
    <Flex width="full" height="full" align="center" justifyContent="center">
      <Box
        p={8}
        maxWidth="500px"
        borderWidth={1}
        borderRadius={8}
        boxShadow="large"
      >
        <Box textAlign="center">
          <Heading>Login</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <form onSubmit={onSubmit}>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input value={username} onChange={onChangeUsername} />
            </FormControl>
            <FormControl mt={6}>
              <FormLabel>Password</FormLabel>
              <Input
                value={password}
                type="password"
                onChange={onChangePassword}
              />
            </FormControl>
            <Button
              width="full"
              mt={4}
              type="submit"
              variant="outline"
              color="teal"
              borderColor="teal"
            >
              Login
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>
  );
};

export default Login;
