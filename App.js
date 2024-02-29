import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import TabNavigator from './navigation/Container';
import * as SplashScreen from 'expo-splash-screen';
import { DataProvider } from './DataContext';

SplashScreen.preventAutoHideAsync();

export default function App() {    

    return (
        <DataProvider>
            <GestureHandlerRootView style={{flex: 1}}>
                <NavigationContainer >
                    <TabNavigator/>
                </NavigationContainer>
            </GestureHandlerRootView>
        </DataProvider>
  );
}
