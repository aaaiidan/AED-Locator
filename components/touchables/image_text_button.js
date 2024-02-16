import React, {useState, useEffect, useRef} from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import styles from '../../styles';

const screenHeight = Dimensions.get('window').height




const ImageTextButton = ({navigation, screen, action, image, text, imageStyle, textStyle, circle = false}) => {

    return (
        <TouchableOpacity style={styles.imageTextContainer} onPress={() => navigation.navigate(screen, {action: action})} >
            {circle ? (
                <View style={{height: '100%', aspectRatio:1, borderRadius: 100, borderWidth:  2,  borderColor: '#FFFFFF',  overflow: 'hidden',}}>
                    <Image
                        source={image}
                        style={imageStyle}
                    />
                </View>

            ):( 
                <Image
                    source={image}
                    resizeMode='contain'
                    style={imageStyle}
                />
            )}
            <Text style={styles.listAEDText} numberOfLines={1}>
                {text}
            </Text>

        </TouchableOpacity>
        
    );
};
    
export default ImageTextButton;