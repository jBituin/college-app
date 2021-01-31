import React from 'react';
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from '@chakra-ui/react';
import { useCollegesQuery } from '../generated/graphql';

const Home: React.FC = () => {
  const { data, loading, error } = useCollegesQuery();

  const getChildComponent = () => {
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
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th></Th>
                <Th>Name</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.colleges.map((college, index) => {
                return (
                  <Tr key={college.id}>
                    <Td>{index + 1}.</Td>
                    <Td>{college.name}</Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
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
        p={8}
        maxWidth="500px"
        borderWidth={1}
        borderRadius={8}
        boxShadow="large"
      >
        <Box textAlign="center">
          <Heading>Manage College</Heading>
        </Box>
        {getChildComponent()}
      </Box>
    </Flex>
  );
};

export default Home;
