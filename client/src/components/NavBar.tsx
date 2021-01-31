import React from 'react';
import NavBarContainer from './NavBarContainer';
import Logo from './Logo';
import MenuToggle from './MenuToggle';
import MenuLinks from './MenuLinks';

interface Props {
  color?: string;
  bg?: string;
}

const NavBar: React.FC<Props> = (props) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <NavBarContainer {...props}>
      <Logo
        w="100px"
        color={['white', 'white', 'primary.500', 'primary.500']}
      />
      <MenuToggle toggle={toggle} isOpen={isOpen} />
      <MenuLinks isOpen={isOpen} />
    </NavBarContainer>
  );
};

export default NavBar;
