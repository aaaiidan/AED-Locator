import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Home from '../screens/Home';
import HelpScreen from '../screens/Help';
import HeaderImage from '../components/header_image';
import QuestionIcon from '../components/question_icon';



const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const StackScreenOptions = {
    headerTitle: () => <HeaderImage/>,
    headerStyle:{
        backgroundColor: '#192734'
    }
}

const TabScreenOptions = {
    headerShown: false
    }

const TabNavigator = () => {
    return (
        <Tab.Navigator initialRouteName='Home' screenOptions={TabScreenOptions}>
            <Tab.Screen 
                name="Home" 
                component={ StackNavigator } 
                options={{ 
                    tabBarStyle: {
                        
                    }  
                }}
            />
            <Tab.Screen 
                name="Help" 
                component={ HelpScreen } 
            
            />
        </Tab.Navigator>
    );
  };

const StackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={StackScreenOptions} >
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
                gestureDirection: 'vertical',
            }}/>
        </Stack.Navigator>
    );
};


export default TabNavigator;
