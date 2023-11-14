import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Home from '../screens/Home';
import HelpScreen from '../screens/Help';
import HeaderImage from '../components/header_image';
import QuestionIcon from '../components/question_icon';
import AEDScreen from '../screens/AEDScreen';



const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const ScreenOptions = {
    headerTitle: () => <HeaderImage/>,
    headerStyle:{
        backgroundColor: '#192734'
    },
}

const TabNavigator = () => {
    return (
        <Tab.Navigator initialRouteName='Home'>
            <Tab.Screen 
                name="Map" 
                component={ HomeStackNavigator } 
                options={{ 
                    headerShown: false,
                }}
            />
            <Tab.Screen 
                name="All AEDs" 
                component={ AllAEDStackNavigator } 
                options={{ 
                    headerShown: false
                }}
            />
        </Tab.Navigator>
    );
  };

const HomeStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={ScreenOptions} >
            <Stack.Screen 
            name="HomeScreen" 
            component ={ Home } 
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
