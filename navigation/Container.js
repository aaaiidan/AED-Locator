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
import EmergencyButton from '../components/touchables/emergency_button';
import EmergencyScreen from '../screens/EmergencyScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


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

const MainNavigator = () => {
    return (
            <Stack.Navigator initialRouteName='TabNavigator' screenOptions={ScreenOptions} >
                <Stack.Screen 
                    name="TabNavigator" 
                    component = { TabNavigator } 
                    options={({ navigation }) => ({
                        headerRight: () => <QuestionIcon navigation={navigation}/>,
                        title: '',
                    })}
                />
                <Stack.Screen 
                    name='Emergency' 
                    component = { EmergencyScreen } 
                    options={({ navigation }) => ({
                        headerRight: () => <QuestionIcon navigation={navigation}/>,
                        title: 'Emergency', 
                        gestureDirection: 'vertical',
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


const TabNavigator = ({ navigation }) => {

    const iconActivity = ( { focused, route } ) => {
        return (
            <Image 
                source={ 
                    route.name == 'Map'
                        ? focused 
                            ? require('../assets/images/active_map.png') 
                            : require('../assets/images/map.png')
                        
                        : route.name == 'AEDList'
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
            <EmergencyButton navigation={ navigation }/>
            <Tab.Navigator screenOptions={customTabBarStyle}>
                <Tab.Screen 
                    name="Map" 
                    component={ Home } 
                    options={({ route }) => ({ 
                        headerShown: false,
                        tabBarIcon: ({ focused }) => iconActivity({ focused, route }),
                        tabBarShowLabel: false, 
                    })}
                />

                <Tab.Screen 
                    name="null" 
                    component={ EmergencyScreen } 
                    listeners={{
                        tabPress: e => {
                          // Prevent default action
                          e.preventDefault();
                        },
                      }}
                />

                <Tab.Screen 
                    name="AEDList" 
                    component={ AEDScreen } 
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

export default MainNavigator;
