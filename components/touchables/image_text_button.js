import React, {useState, useEffect, useRef} from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const screenHeight = Dimensions.get('window').height




const ImageTextButton = ({navigation, screen, action, image, text, imageStyle, textStyle}) => {




    
    return (
        <TouchableOpacity style={styles.ImageTextContainer} onPress={() => navigation.navigate(screen, {action: action})} >
            <View style={{height: '100%', aspectRatio:1, borderRadius: 100,
        borderWidth:  2,
        borderRadius: 100,
        borderColor: '#FFFFFF',  overflow: 'hidden',}}>
                <Image
                    source={image}
                    style={imageStyle}
                />
            </View>
            <Text style={styles.text} numberOfLines={1}>
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
        fontWeight: 'bold',
        fontSize: RFValue(20),
    },

    });
    
    export default ImageTextButton;