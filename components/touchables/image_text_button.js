import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const screenHeight = Dimensions.get('window').height

const ImageTextButton = ({onPress, style, image, text}) => {
    
    
    return (
        <TouchableOpacity style={styles.ImageTextContainer}>
            <Image
                source={image}
                resizeMode='contain'
                style={{width:'50%', height: '100%' }}
            />
            <Text style={styles.text}>
                {text}
            </Text>

        </TouchableOpacity>
        
    );
};
    
const styles = StyleSheet.create({
    ImageTextContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        width:'100%',
        height: '20%',
        backgroundColor: '#192734',
        marginBottom: '2%',
        padding:'2.5%'
    },

    text:{
        textAlign:'right',
        color: '#FFFFFF',
        fontSize: RFValue(20),
        fontWeight: 'bold',
        flexShrink: 1
    },

    });
    
    export default ImageTextButton;