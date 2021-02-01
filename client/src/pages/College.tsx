import React, { useState } from 'react';
import { Flex, Box, Heading, Button, useToast } from '@chakra-ui/react';
import {
  useCollegesQuery,
  useCreateCollegeMutation,
} from '../generated/graphql';
import Listing from '../components/Listing';
import InputForm from '../components/InputForm';

const College: React.FC = () => {
  const { data, loading, error, refetch } = useCollegesQuery();
  const [isAdding, setIsAdding] = useState(false);
  const [name, setName] = useState('');
  const [createCollege] = useCreateCollegeMutation();
  const toast = useToast();

  const onNameChangeHandler = (value: string) => {
    setName(value);
  };

  const inputFields = [
    {
      fieldTitle: 'Name',
      isRequired: true,
      onChangeHandler: onNameChangeHandler,
    },
  ];

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createCollege({
        variables: {
          college: {
            name,
          },
        },
      });
      await refetch();

      toast({
        title: 'College created.',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });

      setIsAdding(false);
    } catch (err) {
      toast({
        title: 'Something went wrong. Please try again later.',
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const getChildComponent = () => {
    if (isAdding) {
      return (
        <InputForm
          inputFields={inputFields}
          onSubmit={onSubmit}
          buttonText="Create"
          headingText="Add College"
        ></InputForm>
      );
    }

    let childComponent: JSX.Element | JSX.Element[] = <div></div>;

    if (loading) {
      childComponent = <div>Loading...</div>;
    }
    if (error) {
      childComponent = <div>Error</div>;
    }
    if (data && data.colleges) {
      if (data.colleges.length) {
        childComponent = (
          <Listing
            data={data.colleges}
            dataKeys={['name']}
            headers={['Name']}
          ></Listing>
        );
      } else {
        childComponent = <div>No colleges</div>;
      }
    }

    return childComponent;
  };

  return (
    <Flex width="full" height="full" align="center" justifyContent="center">
      <Box
        p={10}
        maxWidth="500px"
        boxShadow="large"
        borderWidth={1}
        borderRadius={1}
        minWidth="500px"
      >
        <Box textAlign="center">
          <Heading color="teal">Colleges</Heading>
        </Box>
        {getChildComponent()}
        <Flex align="center" justifyContent="center">
          <Button
            type="submit"
            variant="outline"
            color="teal"
            outlineColor="teal"
            onClick={() => {
              setIsAdding(!isAdding);
            }}
          >
            {!isAdding ? 'Add College' : 'Cancel'}
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default College;
