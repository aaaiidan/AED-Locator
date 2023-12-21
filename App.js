import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './navigation/Container';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as Location from 'expo-location';
import AnimatedViewOverlay from './components/animatedViewOverlay';
//import BottomTabs from './components/bottom_tabs';

export default function App() {
    const [location, setLocation] = useState(null);

    const animatedViewRef = useRef();

    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            const location = await Location.getCurrentPositionAsync({});
           
            setLocation(location);
        })();
    }, []);

    const handleAnimation = (name, address) => {
        if (animatedViewRef.current) {
          animatedViewRef.current.startAnimation(name, address);
        }
      };


    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <NavigationContainer >
                <StackNavigator startAnimation={handleAnimation}/>
            </NavigationContainer>
            <AnimatedViewOverlay ref={animatedViewRef}/>
        </GestureHandlerRootView>
  );
}
