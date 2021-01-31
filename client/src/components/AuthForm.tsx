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
}

const AuthForm: React.FC<Props> = props => {
  const {
    onChangePassword,
    onChangeUsername,
    onSubmit,
    headingText,
    buttonText,
  } = props;

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
          <Heading>{headingText}</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <form onSubmit={onSubmit}>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input onChange={onChangeUsername} isRequired />
            </FormControl>
            <FormControl mt={6}>
              <FormLabel>Password</FormLabel>
              <Input type="password" onChange={onChangePassword} isRequired />
            </FormControl>
            <Button
              width="full"
              mt={4}
              type="submit"
              variant="outline"
              color="teal"
              borderColor="teal"
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
