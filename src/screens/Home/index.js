import React, {useRef, useState, useEffect} from 'react';
import {StatusBar} from 'react-native';
import MapView from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import MapViewDirections from 'react-native-maps-directions';
import {MapsAPI} from '../../config';
import useDevsUberApi from '../../useDevsUberApi';

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
  RequestDetails,
  RequestDetail,
  RequestTitle,
  RequestValue,
  RequestButtons,
  RequestButton,
  RequestButtonText,
} from './styled';

const Page = () => {
  const map = useRef();
  const api = useDevsUberApi();

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
  const [showDirections, setShowDirections] = useState(false);
  // Trajeto
  // Distância
  const [requestDistance, setRequestDistance] = useState(0);
  // Tempo trajeto
  const [requestTime, setRequestTime] = useState(0);
  // Preço
  const [requestPrice, setRequestPrice] = useState(0);

  useEffect(() => {
    Geocoder.init(MapsAPI, {language: 'pt-br'});
    getMyCurrentPosition();
  }, []);

  useEffect(() => {
    if (fromLoc.center && toLoc.center) {
      setShowDirections(true);
    }
  }, [toLoc]);

  //Pegar as informações da minha localização atual
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

  //Função captura clik no mapa origem
  const handleFromClick = () => {};

  //Função captura clik no mapa destino
  const handleToClick = async () => {
    //Pega localização
    const geo = await Geocoder.from('Valentina Figueiredo');
    //Se achou local
    if (geo.results.length > 0) {
      //Montagem
      const loc = {
        name: geo.results[0].formatted_address,
        center: {
          latitude: geo.results[0].geometry.location.lat,
          longitude: geo.results[0].geometry.location.lng,
        },
        zoom: 16,
        pitch: 0,
        altitude: 0,
        heading: 0,
      };
      //Quando setar preenche no app o to
      setToLoc(loc);
    }
  };

  // Rotas
  const handleDirectionsReady = async r => {
    setRequestDistance(r.distance);
    setRequestTime(r.duration);

    const priceReq = await api.getRequestPrice(r.distance, r.duration);

    // Se não deu erro
    if (!priceReq.error) {
      setRequestPrice(priceReq.price);
    }

    // Usa as coordenadas do trajeto
    // Ajusta trajeto na tela
    map.current.fitToCoordinates(r.coordinates, {
      edgePadding: {
        left: 50,
        right: 50,
        bottom: 50,
        top: 1200,
      },
    });
    // console.log("RES: ",r)
  };

  return (
    <Container>
      <StatusBar barStyle="dark-content" />
      <MapView ref={map} style={{flex: 1}} provider="google" camera={mapLoc}>
        {fromLoc.center && (
          <MapView.Marker pinColor="black" coordinate={fromLoc.center} />
        )}

        {toLoc.center && (
          <MapView.Marker pinColor="black" coordinate={toLoc.center} />
        )}

        {showDirections && (
          <MapViewDirections
            origin={fromLoc.center}
            destination={toLoc.center}
            strokeWidth={5}
            apikey={MapsAPI}
            waypoints={[fromLoc.center, toLoc.center]}
            strokeColor="blue"
            onReady={handleDirectionsReady}
            optimizeWaypoints={true}
          />
        )}
      </MapView>
      <IntineraryArea>
        <IntineraryItem onPress={handleFromClick} underlayColor="#EEE">
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

        <IntineraryItem onPress={handleToClick} underlayColor="#EEE">
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
        {fromLoc.center && toLoc.center &&
          <IntineraryItem>
            <>
              <RequestDetails>
                <RequestDetail>
                  <RequestTitle>Distância</RequestTitle>
                  <RequestValue>
                    {requestDistance > 0
                      ? `${requestDistance.toFixed(1)} km`
                      : '---'}
                  </RequestValue>
                </RequestDetail>
                <RequestDetail>
                  <RequestTitle>Tempo</RequestTitle>
                  <RequestValue>
                    {requestTime > 0 ? `${requestTime.toFixed(0)} mins` : '---'}
                  </RequestValue>
                </RequestDetail>
                <RequestDetail>
                  <RequestTitle>Preço</RequestTitle>
                  <RequestValue>
                    {requestPrice > 0 ? `R$ ${requestPrice.toFixed(2)}` : '---'}
                  </RequestValue>
                </RequestDetail>
              </RequestDetails>
              <RequestButtons>
                <RequestButton color="#00FF00">
                  <RequestButtonText>Solicitar Motorista</RequestButtonText>
                </RequestButton>
                <RequestButton color="#FF0000">
                  <RequestButtonText>Cancelar</RequestButtonText>
                </RequestButton>
              </RequestButtons>
            </>
          </IntineraryItem>
        }
      </IntineraryArea>
    </Container>
  );
};

export default Page;
