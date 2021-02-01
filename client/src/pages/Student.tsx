import React, { useState } from 'react';
import { Flex, Box, Heading, useToast, Button } from '@chakra-ui/react';
import {
  useBranchesQuery,
  useCollegesQuery,
  useStudentsQuery,
  useCreateStudentMutation,
  useAssignStudentMutation,
} from '../generated/graphql';
import Listing from '../components/Listing';
import InputForm from '../components/InputForm';

const Student: React.FC = () => {
  const { data: branchData } = useBranchesQuery();

  const {
    data: studentData,
    loading: studentLoading,
    error: studentError,
    refetch: studentRefetch,
  } = useStudentsQuery();

  const { data: collegeData } = useCollegesQuery();

  const [isAdding, setIsAdding] = useState(false);
  const [isAssigning, setIsAssigning] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [collegeId, setCollegeId] = useState('');
  const [studentId, setStudentId] = useState('');
  const [branchId, setBranchId] = useState('');
  const [createStudent] = useCreateStudentMutation();
  const [assignStudent] = useAssignStudentMutation();
  const toast = useToast();

  const onFirstNameChangeHandler = (value: string) => {
    setFirstName(value);
  };

  const onLastNameChangeHandler = (value: string) => {
    setLastName(value);
  };

  const onCollegeChangeHandler = (value: string) => {
    setCollegeId(value);
  };

  const onStudentChangeHandler = (value: string) => {
    setStudentId(value);
  };

  const onBranchChangeHandler = (value: string) => {
    setBranchId(value);
  };

  const showErrorToast = () => {
    toast({
      title: 'Something went wrong. Please try again later.',
      status: 'warning',
      duration: 2000,
      isClosable: true,
    });
  };

  const inputFields = [
    {
      fieldTitle: 'First name',
      isRequired: true,
      onChangeHandler: onFirstNameChangeHandler,
    },
    {
      fieldTitle: 'Last name',
      isRequired: true,
      onChangeHandler: onLastNameChangeHandler,
    },
    {
      fieldTitle: 'Enroll to',
      isRequired: true,
      onChangeHandler: onCollegeChangeHandler,
      type: 'select',
      options: (collegeData && collegeData.colleges) || [],
      optionsValueKey: '_id',
      optionsDisplayKey: 'name',
    },
  ];

  const assignStudentInputFields = [
    {
      fieldTitle: 'Student',
      isRequired: true,
      onChangeHandler: onStudentChangeHandler,
      type: 'select',
      options: (studentData && studentData.students) || [],
      optionsValueKey: '_id',
      optionsDisplayKey: 'fullName',
    },
    {
      fieldTitle: 'Assign to',
      isRequired: true,
      onChangeHandler: onBranchChangeHandler,
      type: 'select',
      options: (branchData && branchData.branches) || [],
      optionsValueKey: '_id',
      optionsDisplayKey: 'name',
    },
  ];

  const onAssignStudent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await assignStudent({
        variables: {
          assignStudent: {
            branchId,
            studentId,
          },
        },
      });

      toast({
        title: 'Student assigned.',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });

      setIsAssigning(false);
    } catch (err) {
      showErrorToast();
    }
  };
  const onCreateStudent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createStudent({
        variables: {
          student: {
            firstName,
            lastName,
          },
          collegeId,
        },
      });
      await studentRefetch();

      toast({
        title: 'Student created.',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });

      setIsAdding(false);
    } catch (err) {
      showErrorToast();
    }
  };

  const getChildComponent = () => {
    if (isAdding) {
      return (
        <InputForm
          inputFields={inputFields}
          onSubmit={onCreateStudent}
          buttonText="Create"
          headingText="Add Student"
        ></InputForm>
      );
    }

    if (isAssigning) {
      return (
        <InputForm
          inputFields={assignStudentInputFields}
          onSubmit={onAssignStudent}
          buttonText="Assign"
          headingText="Assign Student"
        ></InputForm>
      );
    }

    let childComponent: JSX.Element | JSX.Element[] = <div></div>;

    if (studentLoading) {
      childComponent = <div>Loading...</div>;
    }
    if (studentError) {
      childComponent = <div>Error</div>;
    }
    if (studentData && studentData.students) {
      if (studentData.students.length) {
        childComponent = (
          <Listing
            data={studentData.students}
            dataKeys={['firstName', 'lastName', 'college.name']}
            headers={['First Name', 'Last Name', 'College Name']}
          ></Listing>
        );
      } else {
        childComponent = <div>No branches</div>;
      }
    }

    return childComponent;
  };

  const getFooterButtons = () => {
    return (
      <React.Fragment>
        <Button
          type="submit"
          variant="outline"
          color="teal"
          outlineColor="teal"
          onClick={() => {
            setIsAdding(!isAdding);
          }}
        >
          {!isAdding ? 'Add Student' : 'Cancel'}
        </Button>
        <Button
          type="submit"
          variant="outline"
          color="teal"
          outlineColor="teal"
          onClick={() => {
            setIsAssigning(!isAssigning);
          }}
        >
          {!isAssigning ? 'Assign Student' : 'Cancel'}
        </Button>
      </React.Fragment>
    );
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
          <Heading color="teal">Students</Heading>
        </Box>
        {getChildComponent()}
        <Flex align="center" justifyContent="space-around">
          {getFooterButtons()}
        </Flex>
      </Box>
    </Flex>
  );
};

export default Student;
