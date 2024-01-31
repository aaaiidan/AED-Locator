import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import TabNavigator from './navigation/Container';

import { DataProvider } from './DataContext';
//import BottomTabs from './components/bottom_tabs';

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
