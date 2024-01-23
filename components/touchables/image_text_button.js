import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const screenHeight = Dimensions.get('window').height

const ImageTextButton = ({navigation, screen, image, text}) => {
    
    return (
        <TouchableOpacity style={styles.ImageTextContainer} onPress={() => navigation.navigate(screen)}>
            <Image
                source={image}
                resizeMode='contain'
                style={{ width: '33%', height: '100%' }}
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
        height: screenHeight/7,
        backgroundColor: '#192734',
        marginBottom: '2%',
        padding:'2.5%'
    },

    text:{
        flex: 1,
        textAlign:'right',
        color: '#FFFFFF',
        fontSize: RFValue(24),
        fontWeight: 'bold',
      
    },

    });
    
    export default ImageTextButton;