import React, {useState} from 'react';
import {Alert} from 'react-native';
import {
  Container,
  Header,
  HeaderTitle,
  Input,
  ActionButton,
  ActionButtonText,
} from './styled';
// Conectar com redux
import {connect} from 'react-redux';
// Conectar com api
import userDevsUberApi from '../../useDevsUberApi';
//Reducer
import {StackActions, NavigationActions} from 'react-navigation';

const Config = props => {
  const api = userDevsUberApi();
  // Variáveis
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  // Funções
  const handlerName = async r => {
    props.setName(name);
    console.log('Nome: ', name);
    Alert.alert('Alterado com sucesso!');
    // Redirecionar
    props.navigation.dispatch(
      StackActions.reset({
        //Zera o histórico
        index: 0,
        //Manda para HomeStack
        actions: [NavigationActions.navigate({routeName: 'HomeDrawer'})],
      }),
    );
  };

  return (
    <Container>
      <Header>
        <HeaderTitle>DevsUber</HeaderTitle>
      </Header>
      <Input
        value={name}
        onChangeText={t => setName(t)}
        placeholder="Nome"
        placeholderTextColor="#999"
      />
      <ActionButton onPress={handlerName}>
        <ActionButtonText>Salvar</ActionButtonText>
      </ActionButton>
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
    // seta variáveis, pega do store redux
    setToken: token => dispatch({type: 'SET_TOKEN', payload: {token}}),
    setName: name => dispatch({type: 'SET_NAME', payload: {name}}),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Config);
