import React from 'react';
import { Flex, Box, Heading } from '@chakra-ui/react';
import { useBranchesQuery } from '../generated/graphql';
import Listing from '../components/Listing';

const Branch: React.FC = () => {
  const { data, loading, error } = useBranchesQuery();

  const getChildComponent = () => {
    let childComponent: JSX.Element | JSX.Element[] = <div></div>;

    if (loading) {
      childComponent = <div>Loading...</div>;
    }
    if (error) {
      childComponent = <div>Error</div>;
    }
    if (data && data.branches) {
      if (data.branches.length) {
        childComponent = (
          <Listing
            data={data.branches}
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
      <Box p={8} maxWidth="500px" boxShadow="large">
        <Flex align="center" justifyContent="center">
          <Box textAlign="center">
            <Heading color="teal" textAlign="center">
              Manage Branch
            </Heading>
          </Box>

          <Box textAlign="center"></Box>
        </Flex>
        {getChildComponent()}
      </Box>
    </Flex>
  );
};

export default Branch;
