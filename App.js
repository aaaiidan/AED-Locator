import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as Location from 'expo-location';
import * as Font from 'expo-font'
import TabNavigator from './navigation/Container';
//import BottomTabs from './components/bottom_tabs';

export default function App() {    


    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <NavigationContainer >
                <TabNavigator/>
            </NavigationContainer>
        </GestureHandlerRootView>
  );
}
