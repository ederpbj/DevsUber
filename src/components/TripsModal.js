import React, {useState} from 'react';
import {Modal, Alert} from 'react-native';
import styled from 'styled-components/native';
import {AirbnbRating} from 'react-native-ratings';
import useDevsUberApi from '../useDevsUberApi';

// montanto componentes com styled
// Centralizando textos
const ModalArea = styled.View`
  flex: 1;
  background-color: #fff;
  justify-content: center;
  align-items: center;
`;

const DriverHeadline = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #000;
  margin-bottom: 20px;
`;

const DriverAvatar = styled.Image`
  width: 120px;
  height: 120px;
  border-radius: 60px;
`;

const DriverName = styled.Text`
  margin: 20px;
  font-size: 25px;
  font-weight: bold;
  color: #000;
`;

const DriverStars = styled.Text`
  color: #999;
  font-size: 17px;
`;

const DriverCarInfo = styled.View`
  width: 100%;
  margin: 20px;
  border-top-width: 1px;
  border-top-color: #999;
  border-bottom-width: 1px;
  border-bottom-color: #999;
  align-items: center;
  padding: 20px;
`;

const DriverCar = styled.Text`
  font-size: 17px;
  color: #000;
`;

const DriverColor = styled.Text`
  font-size: 15px;
  color: #999;
`;

const DriverPlate = styled.Text`
  font-size: 20px;
  color: #000;
`;

const TripButton = styled.TouchableHighlight`
  height: 50px;
  background-color: #3574cb;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  width: 80%;
`;

const TripButtonText = styled.Text`
  font-size: 17px;
  color: #fff;
`;

const RatingTitle = styled.Text`
  font-size: 15px;
  color: #000;
`;

export default props => {
  const api = useDevsUberApi();

  const [showStars, setShowStars] = useState(false);

  const handleFinishTrip = () => {
    setShowStars(true);
  };

  const handleRating = async rating => {
    // pega função da api, para fechar modal após estrelas
    await api.setingRating(rating);
    props.visibleAction(false);
    Alert.alert('Obrigado pela viagem!');
  };

  return (
    <Modal animationType="slide" transparent={false} visible={props.visible}>
      <ModalArea>
        <DriverHeadline>Seu motorista é: </DriverHeadline>
        <DriverAvatar source={{uri: props.driver.avatar}} />
        <DriverName>{props.driver.name}</DriverName>
        <DriverStars>{props.driver.stars} estrelas</DriverStars>
        {!showStars && (
          <>
            <DriverCarInfo>
              <DriverCar>{props.driver.carName}</DriverCar>
              <DriverColor>{props.driver.carColor}</DriverColor>
              <DriverPlate>{props.driver.carPlates}</DriverPlate>
            </DriverCarInfo>
            <TripButton onPress={handleFinishTrip}>
              <TripButtonText>Encerrar Viagem</TripButtonText>
            </TripButton>
          </>
        )}
        {showStars && (
          <>
            <RatingTitle>Avalie o motorista para encerrar a viagem</RatingTitle>
            <AirbnbRating
              count={5}
              reviews={['Terrivel', 'Ruim', 'Bom', 'Muito bom', 'Ótimo']}
              defaultRating={5}
              onFinishRating={handleRating}
            />
          </>
        )}
      </ModalArea>
    </Modal>
  );
};
