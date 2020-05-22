import React, {useState} from 'react';
import {StatusBar, FlatList, StyleSheet, View, Text} from 'react-native';
import useDevsUberApi from '../../useDevsUberApi';
// import TripsModal from '../../components/TripsModal';
// Conectar com redux
import {connect} from 'react-redux';

import {Container, TripScroll, TripFrom, TripArea} from './styled';

const Trips = props => {
  const [fromLoc, setFromLoc] = useState({});
  const [history, setHistory] = useState('');

  const api = useDevsUberApi();

  // T1
  let data = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];

  // DATA.push(api.getRequestHistory);
  // console.log('History: xxx', api.getRequestHistory.name);

  // setHistory(api.getRequestHistory);
  // data = props.infor;
  // console.log('History XXXX', history.toString);
  // console.log('History XXXX', api.getRequestHistory.name);

  function Item({title}) {
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
      </View>
      // <ItemView>
      //   <ItemText>{title}</ItemText>
      // </ItemView>
    );
  }

  return (
    <Container>
      <StatusBar barStyle="dark-content" />
      <TripScroll>
        <TripFrom>Histórico:</TripFrom>
        <TripArea>
          <FlatList
            data={data}
            renderItem={({item}) => <Item title={item.title} />}
            keyExtractor={item => item.id}
          />
        </TripArea>
      </TripScroll>
    </Container>
  );
};
// export default Trips;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

const mapStateToProps = state => {
  return {
    token: state.userReducer.token,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    // seta variáveis, pega do store redux
    setToken: token => dispatch({type: 'SET_TOKEN', payload: {token}}),
    setHistory: history => dispatch({type: 'SET_HISTORY', payload: {history}}),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Trips);
