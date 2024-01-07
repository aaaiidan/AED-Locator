import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect } from 'react';
import { Image, View } from 'react-native';
import Home from '../screens/Home';
import HelpScreen from '../screens/Help';
import HeaderImage from '../components/touchables/header_image';
import QuestionIcon from '../components/touchables/question_icon';
import AEDScreen from '../screens/AEDScreen';
import TestScreen from '../screens/TestScreen'; 
import EmergencyModal from '../components/modals/emergency_modal';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const EmergencyScreen = () => {
    return null;
}

const ScreenOptions = {
    headerTitle: () => <HeaderImage/>,
    headerStyle:{
        backgroundColor: '#192734'
    },
}

const customTabBarStyle = {
    tabBarStyle: {
        height:'10%',
        backgroundColor: '#192734',
        borderTopWidth: 1,
        borderTopColor: '#15202b',

    }
}


const TabNavigator = () => {

    const iconActivity = ( { focused, route } ) => {
        return (
            <Image 
                source={ 
                    route.name == 'Map'
                        ? focused 
                            ? require('../assets/images/active_map.png') 
                            : require('../assets/images/map.png')
                        
                        : route.name == 'List'
                            ? focused
                                ? require('../assets/images/active_list.png') 
                                : require('../assets/images/pin.png')

                            : require('../assets/images/emergency.png')

                }
                resizeMode='contain'
                style={{height: '90%', width: '100%', marginTop: 10}}
            />
        )
    }
   
    return (
        <View style={{flex:1, flexDirection: 'row', alignItems: 'flex-end',  justifyContent: 'center',}}>
            <EmergencyModal/>
            <Tab.Navigator initialRouteName='Map'  screenOptions={customTabBarStyle}>
                <Tab.Screen 
                    name="Map" 
                    component={ HomeStackNavigator } 
                    options={({ route }) => ({ 
                        headerShown: false,
                        tabBarIcon: ({ focused }) => iconActivity({ focused, route }),
                        tabBarShowLabel: false, 
                    })}
                />

                <Tab.Screen 
                    name="Emergency" 
                    component={ EmergencyScreen } 
                    options={({ route }) => ({ 
                        headerShown: false,
                        tabBarIcon: null,
                        tabBarShowLabel: false,
                        
                    })}
                />

                <Tab.Screen 
                    name="List" 
                    component={ AllAEDStackNavigator } 
                    options={({ route }) => ({ 
                        headerShown: false,
                        tabBarIcon: ({ focused }) => iconActivity({ focused, route }),
                        tabBarShowLabel: false,
                    })}
                />
            </Tab.Navigator>
        </View>
    );
  };

  const HomeStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={ScreenOptions} >
            <Stack.Screen 
                name="HomeScreen" 
                component = { Home } 
                options={({ navigation }) => ({
                    title: 'Home', 
                    headerRight: () => <QuestionIcon navigation={navigation}/>,
                })}
            />
            <Stack.Screen 
                name='Help' 
                component = { HelpScreen } 
                options={{
                    title: 'Help', 
                    gestureDirection: 'horizontal',
                }}
            />
        </Stack.Navigator>
    );
};


const AllAEDStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={ScreenOptions} >
            <Stack.Screen 
            name="AllAED" 
            component ={ AEDScreen } 
            options={({ navigation }) => ({
                title: 'Home', 
                headerRight: () => <QuestionIcon navigation={navigation}/>,
              })}
            />
            <Stack.Screen 
            name='Help' 
            component = { HelpScreen } 
            options={{
                title: 'Help', 
                gestureDirection: 'horizontal',
            }}
            />
        </Stack.Navigator>
    );
};


export default TabNavigator;
