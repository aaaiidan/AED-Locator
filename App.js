import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './navigation/Container';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
//import BottomTabs from './components/bottom_tabs';

export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer >
      <StackNavigator />
    </NavigationContainer>
    </GestureHandlerRootView>
  );
}
