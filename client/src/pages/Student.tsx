import React from 'react';
import { Flex, Box, Heading } from '@chakra-ui/react';
import { useStudentsQuery } from '../generated/graphql';
import Listing from '../components/Listing';

const Student: React.FC = () => {
  const { data, loading, error } = useStudentsQuery();

  const getChildComponent = () => {
    let childComponent: JSX.Element | JSX.Element[] = <div></div>;

    if (loading) {
      childComponent = <div>Loading...</div>;
    }
    if (error) {
      childComponent = <div>Error</div>;
    }
    if (data && data.students) {
      if (data.students.length) {
        childComponent = (
          <Listing
            data={data.students}
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

  return (
    <Flex width="full" height="full" align="center" justifyContent="center">
      <Box p={8} maxWidth="500px" boxShadow="large">
        <Flex align="center" justifyContent="center">
          <Box textAlign="center">
            <Heading color="teal">Manage Student</Heading>
          </Box>

          <Box textAlign="center"></Box>
        </Flex>
        {getChildComponent()}
      </Box>
    </Flex>
  );
};

export default Student;
