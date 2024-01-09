import React, { useState } from 'react';
import { StyleSheet, style, View, Button, Text, TouchableOpacity, Image} from "react-native";

 EmergencyButton = ({ navigation }) => {
    return (
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Emergency')} >
                    <Image
                        source={require('../../assets/images/emergency.png')}
                        resizeMode='contain'
                        style={{height: '100%', width: '100%'}}
                    />
                </TouchableOpacity>
        </View>
    );
    }

    const styles = StyleSheet.create({
        buttonContainer: {
            justifyContent: 'center',
            position: 'absolute',
            zIndex: 1,
            height: 90,
            width: 90,
            backgroundColor: 'red',
            borderColor: '#15202b',
            borderWidth: 4,
            borderRadius: 100,
            bottom: 25,
        },

        button: {
            height:'60%',
            marginBottom: 5
  
        },
      });

export default EmergencyButton;