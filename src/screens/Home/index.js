import React, {useRef, useState, useEffect} from 'react';
import {StatusBar, SafeAreaView, Text} from 'react-native';
import MapView from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import {MapsAPI} from '../../config';

//Desabilita yellow box
console.disableYellowBox = true;
//console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];

import {
  Container,
  IntineraryArea,
  IntineraryItem,
  IntineraryLabel,
  IntineraryPoint,
  IntineraryTitle,
  IntineraryValue,
  IntineraryPlaceHolder,
} from './styled';

const Page = () => {
  const map = useRef();

  const [mapLoc, setMapLoc] = useState({
    center: {
      latitude: 37.78825,
      longitude: -122.4324,
    },
    zoom: 16,
    pitch: 0,
    altidude: 0,
    heading: 0,
  });

  //De -> para
  const [fromLoc, setFromLoc] = useState({});
  const [toLoc, setToLoc] = useState({});

  useEffect(() => {
    Geocoder.init(MapsAPI, {language: 'pt-br'});
    getMyCurrentPosition();
  }, []);

  //Pegar as informações da minha localização
  const getMyCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      async info => {
        //console.log('COORDENADAS: ', info.coords);
        const geo = await Geocoder.from(
          info.coords.latitude,
          info.coords.longitude,
        );

        if (geo.results.length > 0) {
          //console.log("RESULTS[0]: ",geo.results[0]);

          const loc = {
            name: geo.results[0].formatted_address,
            center: {
              latitude: info.coords.latitude,
              longitude: info.coords.longitude,
            },
            zoom: 16,
            pitch: 0,
            altitude: 0,
            heading: 0,
          };

          setMapLoc(loc);
          setFromLoc(loc);
          //console.log("====>Endereço: ", fromLoc)
          //console.log("====>Endereço: ", fromLoc)
          //console.log("RESULTS[0]: ",geo.results[0]);
          //console.log("====>Endereço: ", loc)
        }
      },
      error => {
        console.log('ERRO: ', error.message);
      },
    );
  };

  return (
    <Container>
      <StatusBar barStyle="dark-content" />
      <MapView ref={map} style={{flex: 1}} provider="google" camera={mapLoc} />
      <IntineraryArea>
        <IntineraryItem>
          <>
            <IntineraryLabel>
              <IntineraryPoint color="#0000FF" />
              <IntineraryTitle>Origem</IntineraryTitle>
            </IntineraryLabel>
            {fromLoc.name && <IntineraryValue>{fromLoc.name}</IntineraryValue>}
            {!fromLoc.name && (
              <IntineraryPlaceHolder>
                Escolha um local de origem
              </IntineraryPlaceHolder>
            )}
          </>
        </IntineraryItem>
        <IntineraryItem>
          <>
            <IntineraryLabel>
              <IntineraryPoint color="#00FF00" />
              <IntineraryTitle>Destino</IntineraryTitle>
            </IntineraryLabel>
            {toLoc.name && <IntineraryValue>{toLoc.name}</IntineraryValue>}
            {!toLoc.name && (
              <IntineraryPlaceHolder>
                Escolha um local de destino
              </IntineraryPlaceHolder>
            )}
          </>
        </IntineraryItem>
      </IntineraryArea>
    </Container>
  );
};

export default Page;
