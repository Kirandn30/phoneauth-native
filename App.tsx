import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, Text, View, DeviceEventEmitter, Platform } from 'react-native';
import FirebaseOTP from './src/pages/Auth';
import { Firebase } from './config';
import { NativeBaseProvider, extendTheme } from 'native-base';
import UserDetails from './src/pages/userDetails';
import { Provider } from 'react-redux';
import { RootState, store } from './src/redux';
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from './src/redux/UserSlice';
import Pages from './src';

export default function App() {

  const theme = extendTheme({
    colors: {
      // Add new color
      primary: {
        50: "#202326FF",
        100: "#202326FF",
      },
      // Redefining only one shade, rest of the color will remain same.
      amber: {
        400: "#F7F7F8FF",
      },
    },
    config: {
      // Changing initialColorMode to 'dark'
      initialColorMode: "light",
    },
  });

  return (
    <Provider store={store}>
      <NativeBaseProvider theme={theme}>
        <Pages />
      </NativeBaseProvider>
    </Provider>
  );
}