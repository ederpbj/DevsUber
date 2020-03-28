import React, {useRef, useState} from 'react';
import {StatusBar, SafeAreaView, Text} from 'react-native';
import MapView from 'react-native-maps';

import {Container} from './styled';

const Page = () => {
  const map = useRef();

  const [mapLoc, setMapLoc] = useState({
    center: {
      latitude: 37.78825,
      longitude:-122.4324
    },
    zoom:16,
    pitch:0,
    altidude:0,
    heading:0
  })
  return (
    <Container>
      <StatusBar barStyle="dark-content" />
      <MapView ref={map} style={{flex: 1}} provider="google" camera={mapLoc}></MapView>
    </Container>
  );
};

export default Page;
