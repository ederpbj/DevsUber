import React from 'react';
import {ScrollView, SafeAreaView} from 'react-native';
import {DrawerItems} from 'react-navigation-drawer';
import styled from 'styled-components/native';
// Conectar com redux
import {connect} from 'react-redux';

const Header = styled.View`
  padding: 20px;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
  /* alinha ao lado do outro */
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

const UserAvatar = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: #ddd;
`;

// informações do usuário, ao lado do avatar
const UserInfo = styled.View`
  margin-left: 10px;
`;

const UserName = styled.Text`
  color: #000;
  font-size: 16px;
  font-weight: bold;
`;

const LogoutButton = styled.TouchableHighlight`
  height: 25px;
  justify-content: center;
`;

const LogoutButtonText = styled.Text`
  color: #000;
  font-size: 15px;
`;

const CustomDrawer = props => {
  // export default (props) => {
  const handleLogout = () => {
    // Zera token
    props.setToken('');
    // Manda para preload
    props.navigation.navigate('Preload');
  };
  return (
    <ScrollView>
      <SafeAreaView style={{flex: 1}}>
        <Header>
          <UserAvatar />
          <UserInfo>
            <UserName>{props.name}</UserName>
            <LogoutButton onPress={handleLogout} underlayColor="transparent">
              <LogoutButtonText>Sair</LogoutButtonText>
            </LogoutButton>
          </UserInfo>
        </Header>
        <DrawerItems {...props} />
      </SafeAreaView>
    </ScrollView>
  );
};

// Conectar com redux
const mapStateToProps = state => {
  return {
    // pega o name do redux
    name: state.userReducer.name,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setToken: token => dispatch({type: 'SET_TOKEN', payload: {token}}),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CustomDrawer);
