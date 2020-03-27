import React, {useState} from 'react';
import {StatusBar, Platform, Text, Alert} from 'react-native';
import userDevsUberApi from '../../useDevsUberApi';
import {
  Container,
  Header,
  HeaderTitle,
  Menu,
  MenuItem,
  MenuItemText,
  Input,
  ActionButton,
  ActionButtonText,
} from './styled';

//Reducer
import {StackActions, NavigationActions} from 'react-navigation';
import {connect} from 'react-redux';

const Page = props => {
  const api = userDevsUberApi();
  //const res = await api.signin(email, password);

  const [activeMenu, setActiveMenu] = useState('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //const [error, setError] = useState('');

  const handlerSignIn = async () => {
    if (email && password) {
      const res = await api.signin(email, password);

      if (res.error) {
        //Alert(res.error);
        Alert.alert(res.error);
      } else {
        //1. guardar o token no reducer, setar no reducer
        props.setToken(res.token);
        //2. Redirecionar para o Home
        props.navigation.dispatch(
          StackActions.reset({
            //Zera o histórico
            index: 0,
            //Manda para HomeStack
            actions: [NavigationActions.navigate({routeName: 'HomeStack'})],
          }),
        );
      }
      console.log(res);
    }
  };

  const handlerSignUp = async () => {
    if (name && email && password) {
      const res = await api.signin(name, email, password);

      if (res.error) {
        Alert.alert('Erro do signUp');
        Alert.alert(res.error);
      } else {
        //1. guardar o token no reducer, setar no reducer
        props.setToken(res.token);
        //2. Redirecionar para o Home
        props.navigation.dispatch(
          StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: 'HomeStack'})],
          }),
        );
      }
      console.log(res);
    }
  };

  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : null}>
      <StatusBar barStyle="light-content" />
      <Header>
        <HeaderTitle>DevsUber</HeaderTitle>
      </Header>
      <Menu>
        <MenuItem
          active={activeMenu === 'signin'}
          onPress={() => setActiveMenu('signin')}
          underlayColor="transparent">
          <MenuItemText>Login</MenuItemText>
        </MenuItem>
        <MenuItem
          active={activeMenu === 'signup'}
          onPress={() => setActiveMenu('signup')}
          underlayColor="gray">
          <MenuItemText>Cadastrar</MenuItemText>
        </MenuItem>
      </Menu>

      {activeMenu === 'signup' && (
        <Input
          value={name}
          onChangeText={t => setName(t)}
          placeholder="Nome"
          placeholderTextColor="#999"
        />
      )}

      <Input
        value={email}
        onChangeText={t => setEmail(t)}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholder="E-mail"
        placeholderTextColor="#999"
      />
      <Input
        value={password}
        secureTextEntry={true}
        onChangeText={t => setPassword(t)}
        placeholder="Senha"
        placeholderTextColor="#999"
      />

      {activeMenu === 'signin' && (
        <ActionButton onPress={handlerSignIn}>
          <ActionButtonText>Login</ActionButtonText>
        </ActionButton>
      )}

      {activeMenu === 'signup' && (
        <ActionButton onPress={handlerSignUp}>
          <ActionButtonText>Cadastrar</ActionButtonText>
        </ActionButton>
      )}

      <Text>TOKEN: {props.token}</Text>
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    token: state.userReducer.token,
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
)(Page);
