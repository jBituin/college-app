import React from 'react';
import { Box, Text } from '@chakra-ui/react';

interface Props {
  w: string;
  color: string[];
}

const Logo: React.FC<Props> = (props) => {
  return (
    <Box {...props}>
      <Text fontSize="lg" fontWeight="bold">
        College
      </Text>
    </Box>
  );
};

export default Logo;
