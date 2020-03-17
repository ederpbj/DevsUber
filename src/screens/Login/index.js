import React, {useState} from 'react';
import {Text} from 'react-native';
import {
  Container,
  Header,
  HeaderTitle,
  Menu,
  MenuItem,
  MenuItemText,
} from './styled';

const Page = () => {
  const [activeMenu, setActiveMenu] = useState('signin');

  return (
    <Container>
      <Header>
        <HeaderTitle>DevsUber</HeaderTitle>
      </Header>
      <Menu>
        <MenuItem
          active={activeMenu == 'signin'}
          onPress={() => setActiveMenu('signin')}
          underlayColor="transparent">
          <MenuItemText>Login</MenuItemText>
        </MenuItem>
        <MenuItem
          active={activeMenu == 'signup'}
          onPress={() => setActiveMenu('signup')}
          underlayColor="gray">
          <MenuItemText>Cadastrar</MenuItemText>
        </MenuItem>
      </Menu>
    </Container>
  );
};

export default Page;
