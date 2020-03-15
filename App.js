import React, { Component } from 'react'
import { Text, SafeAreaView } from 'react-native'
import { Provider } from 'react-redux'
import {store, persistor} from './src/store'
import { PersistGate } from 'redux-persist/integration/react'

const Teste = () => {
  return (
    <SafeAreaView>
      <Text>...</Text>
    </SafeAreaView>
  );
}

export default () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Teste />
    </PersistGate>
  </Provider>
);