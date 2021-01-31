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

interface InputField {
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fieldTitle: string;
  isRequired: boolean;
}
interface Props {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  headingText: string;
  buttonText: string;
  inputFields: InputField[];
}

const InputForm: React.FC<Props> = (props) => {
  const { onSubmit, headingText, buttonText, inputFields } = props;

  const renderInputFields = () => {
    return inputFields.map(({ onChangeHandler, fieldTitle, isRequired }) => (
      <FormControl key={fieldTitle}>
        <FormLabel>{fieldTitle}</FormLabel>
        <Input onChange={onChangeHandler} isRequired={isRequired} />
      </FormControl>
    ));
  };
  return (
    <Flex
      p={8}
      my={8}
      width="full"
      height="full"
      align="center"
      justifyContent="center"
    >
      <Box p={8} maxWidth="500px">
        <Box textAlign="center">
          <Heading>{headingText}</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <form onSubmit={onSubmit}>
            {renderInputFields()}
            <Button
              width="full"
              mt={8}
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

export default InputForm;
