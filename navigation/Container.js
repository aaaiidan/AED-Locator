import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Home from '../screens/Home';
import HelpScreen from '../screens/Help';
import HeaderImage from '../components/header_image';
import QuestionIcon from '../components/question_icon';
import AEDScreen from '../screens/AEDScreen';
import TestScreen from '../screens/TestScreen'; 
import animatedViewOverlay from '../components/animatedViewOverlay';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const ScreenOptions = {
    headerTitle: () => <HeaderImage/>,
    headerStyle:{
        backgroundColor: '#192734'
    },
}

const TabNavigator = ( {startAnimation} ) => {
    console.log(startAnimation);

    return (
        <Tab.Navigator initialRouteName='Home'  >
            <Tab.Screen 
                name="Map" 
                component={ HomeStackNavigator } 
                options={{ 
                    headerShown: false,
                }}
                initialParams={ { startAnimation } }
            />
            <Tab.Screen 
                name="All AEDs" 
                component={ AllAEDStackNavigator } 
                options={{ 
                    headerShown: false
                }}
            />

            <Tab.Screen 
                name="Test" 
                component={ TestScreen } 
                options={{ 
                    headerShown: true
                }}
            />
        </Tab.Navigator>
    );
  };

  const HomeStackNavigator = ({ route }) => {
    const startAnimation = route.params?.startAnimation;
    console.log('-----------', startAnimation);

    return (
        <Stack.Navigator screenOptions={ScreenOptions} >
            <Stack.Screen 
                name="HomeScreen" 
                options={({ navigation }) => ({
                    title: 'Home', 
                    headerRight: () => <QuestionIcon navigation={navigation}/>,
                })}
            >
                {(props) => <Home {...props} startAnimation={startAnimation} />}
            </Stack.Screen>

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
