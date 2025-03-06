import { StyleSheet, Text, View } from 'react-native';

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AppNavigator from './src/navigation/AppNavigator';

// Definir los tipos del stack de navegación
type RootStackParamList = {
  Home: undefined;
  AddTask: undefined; // Definiremos esta pantalla después
};

// Crear el stack con los tipos correctos
const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return <AppNavigator />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
