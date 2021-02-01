import React, { useState } from 'react';
import { Flex, Box, Heading, useToast, Button } from '@chakra-ui/react';
import {
  useBranchesQuery,
  useCreateBranchMutation,
  useCollegesQuery,
} from '../generated/graphql';
import Listing from '../components/Listing';
import InputForm from '../components/InputForm';

const Branch: React.FC = () => {
  const {
    data: branchData,
    loading: branchLoading,
    error: branchError,
    refetch: branchRefetch,
  } = useBranchesQuery();

  const {
    data: collegeData,
    loading: collegeLoading,
    error: collegeError,
    refetch: collegeRefetch,
  } = useCollegesQuery();

  const [isAdding, setIsAdding] = useState(false);
  const [name, setName] = useState('');
  const [collegeId, setCollegeId] = useState('');
  const [createBranch] = useCreateBranchMutation();
  const toast = useToast();

  const onNameChangeHandler = (value: string) => {
    setName(value);
  };

  const onCollegeChangeHandler = (value: string) => {
    setCollegeId(value);
  };

  const inputFields = [
    {
      fieldTitle: 'Name',
      isRequired: true,
      onChangeHandler: onNameChangeHandler,
    },
    {
      fieldTitle: 'Branch Of',
      isRequired: true,
      onChangeHandler: onCollegeChangeHandler,
      type: 'select',
      options: (collegeData && collegeData.colleges) || [],
      optionsValueKey: '_id',
      optionsDisplayKey: 'name',
    },
  ];

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createBranch({
        variables: {
          branch: {
            name,
          },
          collegeId,
        },
      });
      await branchRefetch();

      toast({
        title: 'Branch created.',
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
          headingText="Add Branch"
        ></InputForm>
      );
    }

    let childComponent: JSX.Element | JSX.Element[] = <div></div>;

    if (branchLoading) {
      childComponent = <div>Loading...</div>;
    }
    if (branchError) {
      childComponent = <div>Error</div>;
    }
    if (branchData && branchData.branches) {
      if (branchData.branches.length) {
        childComponent = (
          <Listing
            data={branchData.branches}
            dataKeys={['name', 'numberOfStudents', 'college.name']}
            headers={['Name', 'Number Of Students', 'College Name']}
          ></Listing>
        );
      } else {
        childComponent = <div>No branches</div>;
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
          <Heading color="teal">Branches</Heading>
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
            {!isAdding ? 'Add Branch' : 'Cancel'}
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Branch;
