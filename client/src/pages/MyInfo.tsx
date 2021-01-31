import React from 'react';
import { useMyInfoQuery } from '../generated/graphql';
import { Flex, Box, Text } from '@chakra-ui/react';

const MyInfo: React.FC = () => {
  const { data, loading, error } = useMyInfoQuery();

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    console.log('error :>> ', error);
    return <div>Error</div>;
  }
  if (!data) {
    return <div>No data</div>;
  }
  return (
    <Flex width="full" height="full" align="center" justifyContent="center">
      <Box>
        <Text fontSize="6xl">Hi {data.myInfo}!</Text>
      </Box>
    </Flex>
  );
};

export default MyInfo;
