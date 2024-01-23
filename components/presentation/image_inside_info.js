import React, {useState} from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import ImageTextButton from '../touchables/image_text_button';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
//import externalStyle from '../style/externalStyle';

const screenHeight = Dimensions.get('window').height
const ImageInsideInfo = ({children}) => {

    return (
        <View style={styles.imageInsideInfo}>
            {React.Children.map(children, (child, index) => (
                <View style={styles.imageContainer}>
                    {child}
                </View>
                ))}
        </View>
        
    );
};

const styles = StyleSheet.create({
    imageInsideInfo: {
        flex: 1,
        justifyContent: 'center',
        flexDirection:'row',
        flexWrap: 'wrap',
        marginBottom: '5%',
    },
    
    imageContainer: {
        width: '30%',
        height: screenHeight/5,
        padding: '2%',
        backgroundColor: '#1f3141',
        margin: '1%',
        justifyContent: 'center',
    },


});

export default ImageInsideInfo;

