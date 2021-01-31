import React from 'react';
import { Link } from 'react-router-dom';
import { Text } from '@chakra-ui/react';

interface Props {
  children: string;
  isLast: boolean;
  isActive: boolean;
  to: string;
  onClick: () => void;
}

const MenuItem: React.FC<Props> = ({
  children,
  isLast,
  to = '/',
  isActive,
  onClick,
  ...rest
}) => {
  const getText = () => {
    if (isActive) {
      return (
        <Text fontWeight="bold" as="u">
          {children}
        </Text>
      );
    }
    return <Text>{children}</Text>;
  };
  return (
    <Link to={to} onClick={onClick}>
      <Text display="block" {...rest}>
        {getText()}
      </Text>
    </Link>
  );
};

export default MenuItem;
