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
          console.log("RESULTS[0]: ",geo.results[0]);

          const loc = {
            name: geo.results[0].formatted_adress,
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
              <IntineraryPoint />
              <IntineraryTitle>Origem</IntineraryTitle>
            </IntineraryLabel>
            <IntineraryValue>...</IntineraryValue>
          </>
        </IntineraryItem>
        <IntineraryItem>
          <>
            <IntineraryLabel>
              <IntineraryPoint />
              <IntineraryTitle>Destino</IntineraryTitle>
            </IntineraryLabel>
            <IntineraryValue>...</IntineraryValue>
          </>
        </IntineraryItem>
      </IntineraryArea>
    </Container>
  );
};

export default Page;
