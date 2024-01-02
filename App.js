import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './navigation/Container';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as Location from 'expo-location';
import * as Font from 'expo-font'
//import BottomTabs from './components/bottom_tabs';

export default function App() {    

    const [location, setLocation] = useState(null);
    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            const location = await Location.getCurrentPositionAsync({});
           
            setLocation(location);
        })();

    }, []);

   


    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <NavigationContainer >
                <StackNavigator/>
            </NavigationContainer>
        </GestureHandlerRootView>
  );
}
