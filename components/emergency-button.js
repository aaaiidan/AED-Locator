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
        padding: 20,
        borderRadius: 50,
        marginBottom: 80,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Arial',
        fontSize: '30pt' ,
    },
});

export default EmergencyButton;
