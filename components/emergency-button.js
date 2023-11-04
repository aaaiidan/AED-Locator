import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const EmergencyButton = ({ label, onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
        <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({

    button: {
        backgroundColor: '#018489',
        padding: 10,
        borderRadius: 5,
        margin: 50,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Arial',
        fontSize: '20pt' ,
    },
});

export default EmergencyButton;
