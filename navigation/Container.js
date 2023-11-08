import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Home from '../screens/Home';
import HelpScreen from '../screens/Help';
import HeaderImage from '../components/header_image';
import QuestionIcon from '../components/question_icon';



const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen name="Home" component ={ Home } options={{ 
                title: '', 
                headerTitle: () => <HeaderImage/>,
                headerRight: () => <QuestionIcon />,
                headerStyle:{
                    backgroundColor: '#192734'
                }
                }} />
            <Stack.Screen name='Help' component = { HelpScreen } options={{
                title: '' 
            }}/>
        </Stack.Navigator>
    );
};

export default StackNavigator;
