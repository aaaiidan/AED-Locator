import { View, TouchableOpacity , Text, StyleSheet, TouchableHighlight, Button } from 'react-native';
import React, { useState } from "react";
import EmergencyButton from '../components/emergency-button';
//import externalStyle from '../style/externalStyle';

const Home = () => {

    const MeButtonPress = () => {

    }

  return (
    <View style={styles.container}>
        <View style={styles.buttonContainer}>
            <EmergencyButton label = "I am having an emergency" onPress={MeButtonPress}/>
        </View>
        <View style={styles.buttonContainer}>
            <EmergencyButton label = "Somebody else is having an emergency" onPress={MeButtonPress}/>
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
        backgroundColor: '#002b5c',
    },
    buttonContainer: {
        width: '100%',
        padding: 10,
    }
});

export default Home;
