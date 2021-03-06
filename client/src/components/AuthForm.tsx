import React from 'react';
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
} from '@chakra-ui/react';

interface Props {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onChangeUsername: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  headingText: String;
  buttonText: String;
  username: string;
  password: string;
}

const AuthForm: React.FC<Props> = (props) => {
  const {
    onChangePassword,
    onChangeUsername,
    onSubmit,
    headingText,
    buttonText,
    username,
    password,
  } = props;

  return (
    <Flex width="full" height="full" align="center" justifyContent="center">
      <Box
        p={8}
        minWidth="300px"
        minHeight="400px"
        maxHeight="300px"
        borderWidth={1}
        borderRadius={8}
        boxShadow="large"
      >
        <Box textAlign="center" mb={5}>
          <Heading>{headingText}</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <form onSubmit={onSubmit}>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input value={username} onChange={onChangeUsername} isRequired />
            </FormControl>
            <FormControl mt={6}>
              <FormLabel>Password</FormLabel>
              <Input
                value={password}
                type="password"
                onChange={onChangePassword}
                isRequired
              />
            </FormControl>
            <Button
              width="full"
              mt={16}
              type="submit"
              variant="outline"
              color="teal"
              borderColor="teal"
              alignSelf="end"
            >
              {buttonText}
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>
  );
};

export default AuthForm;
