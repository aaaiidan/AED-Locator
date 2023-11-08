import * as React from 'react';
import { View, TouchableOpacity , Text, StyleSheet, TouchableHighlight, Button } from 'react-native';
import EmergencyButton from '../components/emergency-button';
//import externalStyle from '../style/externalStyle';

const Home = ({navigation}) => {
    const loadMain = () => {
        navigation.navigate('Main');
        console.log('hello')
    }

  return (
    <View style={styles.container}>
        <View style={styles.buttonContainer}>
            <EmergencyButton label = "I am having an emergency" onPress={loadMain} />
        </View>
        <View style={styles.buttonContainer}>
            <EmergencyButton label = "Somebody else is having an emergency"/>
        </View>
    </View>
    
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#15202b',
    },
    buttonContainer: {
        width: '100%',
        padding: 10,
    }
});

export default Home;
