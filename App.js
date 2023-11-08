import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Home from './screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './navigation/Container';

export default function App() {
  return (
    <NavigationContainer >
      <StackNavigator />
    </NavigationContainer>

  );
}
