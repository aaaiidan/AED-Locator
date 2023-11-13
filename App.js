import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './navigation/Container';
//import BottomTabs from './components/bottom_tabs';

export default function App() {
  return (
    <NavigationContainer >
      <StackNavigator />
    </NavigationContainer>

  );
}
