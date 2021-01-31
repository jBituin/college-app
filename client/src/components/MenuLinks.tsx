import React from 'react';
import { Stack, Box } from '@chakra-ui/react';
import MenuItem from './MenuItem';
import { useLocation } from 'react-router-dom';
import { getAccessToken, setAccessToken } from '../accessToken';
import { useLogoutMutation } from '../generated/graphql';

interface Props {
  isOpen: boolean;
}

const MenuLinks: React.FC<Props> = ({ isOpen }) => {
  const token = getAccessToken();
  const [logout] = useLogoutMutation();

  const onLogout = async () => {
    setAccessToken('');
    await logout();
  };
  const menuItems = [
    { text: 'Register', to: '/register', isAuth: false, onClick: () => {} },
    { text: 'Login', to: '/login', isAuth: false, onClick: () => {} },
  ];

  const loggedInMenuItems = [
    { text: 'Home', to: '/', isAuth: true, onClick: () => {} },
    { text: 'MyInfo', to: '/my-info', isAuth: true, onClick: () => {} },
    { text: 'Logout', to: '/login', isAuth: true, onClick: onLogout },
  ];

  const location = useLocation();

  const renderMenuItems = () => {
    let items = menuItems;
    if (!!token) items = loggedInMenuItems;
    return items.map(({ to, text, isAuth, onClick }, index) => {
      return (
        <MenuItem
          to={to}
          isLast={index === menuItems.length - 1}
          isActive={location.pathname === to}
          key={to}
          onClick={onClick}
        >
          {text}
        </MenuItem>
      );
    });
  };
  return (
    <Box
      display={{ base: isOpen ? 'block' : 'none', md: 'block' }}
      flexBasis={{ base: '100%', md: 'auto' }}
    >
      <Stack
        spacing={8}
        align="center"
        justify={['center', 'space-between', 'flex-end', 'flex-end']}
        direction={['column', 'row', 'row', 'row']}
        pt={[4, 4, 0, 0]}
      >
        {renderMenuItems()}
      </Stack>
    </Box>
  );
};

export default MenuLinks;
