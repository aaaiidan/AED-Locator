import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Home from '../screens/Home';
import HelpScreen from '../screens/Help';
import HeaderImage from '../components/header_image';
import QuestionIcon from '../components/question_icon';
import MainScreen from '../screens/MainScreen'



const Stack = createNativeStackNavigator();
const commonScreenOptions = {
    headerTitle: () => <HeaderImage/>,
    headerStyle:{
        backgroundColor: '#192734'
    }
}

const StackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName='Home' screenOptions={commonScreenOptions} >
            <Stack.Screen 
            name="Home" 
            component ={ Home } 
            options={({ navigation }) => ({
                title: 'Home', 
                headerRight: () => <QuestionIcon navigation={navigation}/>,
              })}
            />
            <Stack.Screen name='Help' component = { HelpScreen } options={{
                title: 'Help', 
                gestureDirection: 'vertical',
            }}/>
             <Stack.Screen name='Main' component = { MainScreen } options={{
                title: 'AED Locator', 
            }}/>
        </Stack.Navigator>
    );
};

export default StackNavigator;
