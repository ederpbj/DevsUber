import React, {useRef, useState, useEffect} from 'react';
import {StatusBar, ActivityIndicator, Alert} from 'react-native';
import MapView from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import MapViewDirections from 'react-native-maps-directions';
import {MapsAPI} from '../../.config';
import useDevsUberApi from '../../useDevsUberApi';
import AdressModal from '../../components/AdressModal';
import DriverModal from '../../components/DriverModal';

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
  LoadingArea,
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
  // AddressModal: Modal de components
  const [modalTitle, setModalTitle] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalField, setModalField] = useState('');

  // DriverModal
  // informações em texto
  const [driverInfo, setDriverInfo] = useState('');
  // exibir modal
  const [driverModalVisible, setDriverModalVisible] = useState(false);

  // carregar
  const [loading, setLoading] = useState(false);

  // Inicia geocoder
  useEffect(() => {
    Geocoder.init(MapsAPI, {language: 'pt-br'});
    getMyCurrentPosition();
  }, []);

  // para mostrar marker
  useEffect(() => {
    if (toLoc.center) {
      setShowDirections(true);
    }
  }, [toLoc]);

  // para mostrar marker
  useEffect(() => {
    if (fromLoc.center) {
      setMapLoc(fromLoc);
    }
  }, [fromLoc]);

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
  const handleFromClick = () => {
    setModalTitle('Escolha uma origem');
    // da pesquisa: seta o campo e manda para o modal'
    setModalField('from');
    setModalVisible(true);
  };

  //Função captura clik no mapa destino
  const handleToClick = async () => {
    setModalTitle('Escolha um destino');
    setModalField('to');
    setModalVisible(true);
    /*
    //Pega localização
    const geo = await Geocoder.from('Camarao Sul');
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

     */
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
        bottom: 20,
        top: 1500,
      },
    });
    // console.log("RES: ",r)
  };

  // Botão Solicitar
  const handleRequestGo = async () => {
    // tela carregando...
    setLoading(true);
    // achar motorista, criar na api
    const driver = await api.findDriver({
      fromlat: fromLoc.center.latitude,
      fromlng: fromLoc.center.longitude,
      tolat: fromLoc.center.latitude,
      tolng: fromLoc.center.longitude,
      // from: {

      // },
      // to: {

      // }
    });
    setLoading(false);
    if (!driver.error) {
      // achou motorista
      setDriverInfo(driver.driver);
      setDriverModalVisible(true);
      // Limpar
      handleRequestCancel();
    } else {
      Alert.alert(driver.error);
    }
  };

  // Botão cancelar
  const handleRequestCancel = () => {
    setToLoc({});
    setShowDirections(false);
    setRequestDistance(0);
    setRequestTime(0);
    setRequestPrice(0);
    // Voltar a posição original
    setMapLoc(fromLoc);
  };

  // Monitora mudança na posição do mapa
  const handleMapChange = async () => {
    // Pegar camera
    const cam = await map.current.getCamera();
    cam.altitude = 0;
    // cam.zoom = 0;
    setMapLoc(cam);
  };

  // Quando usuário clicar no endereço
  const handleModalClick = (field, address) => {
    //Montagem
    const loc = {
      name: address.address,
      center: {
        latitude: address.latitude,
        longitude: address.longitude,
      },
      zoom: 16,
      pitch: 0,
      altitude: 0,
      heading: 0,
    };
    // campo from ou to
    // console.log('FIELD', field);
    // endereço escolhido
    // console.log('ADRESS', address);

    switch (field) {
      case 'from':
        setFromLoc(loc);
        break;
      case 'to':
        setToLoc(loc);
        break;

      default:
        break;
    }
  };

  return (
    <Container>
      <StatusBar barStyle="dark-content" />
      <DriverModal
        driver={driverInfo}
        visible={driverModalVisible}
        visibleAction={setDriverModalVisible}
      />
      <AdressModal //busca de endereço
        title={modalTitle}
        visible={modalVisible}
        visibleAction={setModalVisible}
        field={modalField}
        clickAction={handleModalClick}
      />
      <MapView
        ref={map}
        style={{flex: 1}}
        provider="google"
        camera={mapLoc}
        onRegionChangeComplete={handleMapChange}>
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
        {fromLoc.center && toLoc.center && (
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
                <RequestButton color="#00FF00" onPress={handleRequestGo}>
                  <RequestButtonText>Solicitar Motorista</RequestButtonText>
                </RequestButton>
                <RequestButton color="#FF0000" onPress={handleRequestCancel}>
                  <RequestButtonText>Cancelar</RequestButtonText>
                </RequestButton>
              </RequestButtons>
            </>
          </IntineraryItem>
        )}
      </IntineraryArea>
      {loading && (
        <LoadingArea>
          <ActivityIndicator size="large" color="#FFF" />
        </LoadingArea>
      )}
    </Container>
  );
};

export default Page;
