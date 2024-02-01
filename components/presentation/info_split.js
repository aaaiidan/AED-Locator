import React, {useState} from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import ImageTextButton from '../touchables/image_text_button';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
//import externalStyle from '../style/externalStyle';

const screenHeight = Dimensions.get('window').height
const HeaderWithInfo = ({title, subHeading, children}) => {

    return (
        <View style={styles.headerInfoContainer}>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{title}</Text>
            </View>

            {children.forEach(child => {
                <View style = {styles.subContainer}>
                    <View style={styles.textContainer}>
                        {children}
                    </View>
                </View>
            })}
            
        </View>  
        
    );
};

const styles = StyleSheet.create({

headerInfoContainer: {
    flexDirection: 'column',
    width: '100%',
    marginBottom: '3%',
},

textContainer: {
    minHeight: 25,
    flexDirection: 'column',
    backgroundColor: '#192734',
    marginBottom: 3,
    justifyContent: 'center',
    paddingHorizontal: '2%',
    paddingVertical: '1%',
},

title:{
    textAlign:'left',
    color: '#FFFFFF',
    fontSize: RFValue(14),
    fontWeight: 'bold',
},

text:{
    textAlign:'left',
    color: '#FFFFFF',
    fontSize: RFValue(14),
},

subContainer: {
    minHeight: 25,
    flexDirection: 'row',
    backgroundColor: '#192734',
    marginBottom: 3,
    paddingLeft: 5,
},


});