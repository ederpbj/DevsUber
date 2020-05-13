import React, {useState, useEffect} from 'react';
import {Modal} from 'react-native';
import styled from 'styled-components/native';
import Geocoder from 'react-native-geocoding';
import {MapsAPI} from '../.config';

// montanto componentes com styled
const ModalArea = styled.View`
  flex: 1;
  background-color: #fff;
`;

const ModalHeader = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 20px;
`;

const ModalClose = styled.TouchableHighlight`
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  background-color: #eee;
  border-radius: 20px;
`;

const ModalCloseText = styled.Text`
  /* color: #FF0000; */
`;

const ModalInput = styled.TextInput`
  margin-left: 20px;
  font-size: 18px;
  color: #000;
  /* font-weight: bold; */
`;

const ModalResults = styled.View`
  background-color: #ff0000;
`;

const ModalResult = styled.TouchableHighlight`
  padding: 15px;
`;

const ModalResultText = styled.Text`
  color: #000;
  font-size: 16px;
`;

// Tempo de espera para pesquisar
let timer;

export default props => {
  // Armazenar resultados, array vazio
  const [results, setResults] = useState([]);

  // procurar endereço
  const [searchText, setSearchText] = useState('');

  // Sempre que ele mudar
  // Fica monitorando searchText, que usa o geocoder
  useEffect(() => {
    if (searchText) {
      // fazer a pesquisa...
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(async () => {
        console.log('FAZENDO PESQUISA!');
        //Busca localização pelo texto digitado
        const geo = await Geocoder.from(searchText);
        console.log('RESULTADO!', geo.results.length);

        //Se achou local
        if (geo.results.length > 0) {
          let tmpResults = [];

          for (let i in geo.results) {
            // Adicionar um item
            tmpResults.push({
              address: geo.results[i].formatted_address,
              latitude: geo.results[i].geometry.location.lat,
              longitude: geo.results[i].geometry.location.lng,
            });
          }
          setResults(tmpResults);
        } else {
          setResults([]);
        }
      }, 1000);
    }
  }, [searchText]);

  // Fecha modal de home
  const handleCloseAction = () => {
    props.visibleAction(false);
  };

  // Inicia geocoder
  useEffect(() => {
    Geocoder.init(MapsAPI, {language: 'pt-br'});
  }, []);

  const handleClose = () => {
    setResults([]);
    setSearchText('');
  };
  // <ModalTitle>{props.title}</ModalTitle>
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={props.visible}
      onShow={handleClose}>
      <ModalArea>
        <ModalHeader>
          <ModalClose onPress={handleCloseAction}>
            <ModalCloseText>X</ModalCloseText>
          </ModalClose>
          <ModalInput
            value={searchText}
            onChangeText={t => setSearchText(t)}
            autoFocus={true}
            placeholder={props.title}
            placeholderTextColor="#999"
          />
        </ModalHeader>
        <ModalResults>
          {results.map((i, k) => (
            <ModalResult key={k}>
              <ModalResultText>{i.address}</ModalResultText>
            </ModalResult>
          ))}
        </ModalResults>
      </ModalArea>
    </Modal>
  );
};
