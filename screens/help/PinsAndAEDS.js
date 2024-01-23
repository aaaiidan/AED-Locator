import React, {useState} from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import ImageTextButton from '../../components/touchables/image_text_button';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import HeaderWithInfo from '../../components/presentation/header_with_info';
//import externalStyle from '../style/externalStyle';

const screenHeight = Dimensions.get('window').height
const PinsAndAEDs = ({navigation}) => {

    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
                <HeaderWithInfo
                    title={'Pins'}
                    text={'\nOn the map there are green pins representing each location of the Automated External Defribrillators (AEDS). Each pin, when pressed, provides information about the AED and its location.'
                    + ' The information provided is as follows: \n\n1. Name \n2. Address \n3. Floor \n4. Opening Times \n5. Description \n6. Brand \n\nDirections to each AED are accessed, simply, by pressing on the directions button underneath the key information.'}
                />
                <HeaderWithInfo 
                    title={'Directions'}
                    text={'The aim of this application is to quickly and efficiently guide you, the user, to the nearest (or any) AED in case of an emergency. \n\nOnce directions have been activated, a line betweeen your location and the AED will be displayed, alongside the direction and distance to follow. To cancel the directions, swipe up or down on the pop-up.'}
                >
                </HeaderWithInfo>
            </View>
        </View>
        
    );
};

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#15202b',
    paddingLeft: (screenHeight * 0.025),
    paddingRight: (screenHeight * 0.025),
    paddingTop: (screenHeight * 0.025) ,
    paddingBottom: (screenHeight * 0.025),
},
subContainer: {
    flex: 1,
    justifyContent:'flex-start',
    
    
},

mediumFullInfoContainer: {
    flexDirection: 'column',
    width: '100%',
    marginBottom: '3%',
},

textContainer:{
    justifyContent: 'center',
},


name:{
    textAlign:'left',
    color: '#FFFFFF',
    fontSize: RFValue(14),
    fontWeight: 'bold',
    marginBottom: '2%',
    flexShrink: 1
},

subContainer3: {
    minHeight: 25,
    flexDirection: 'row',
    backgroundColor: '#192734',
    marginBottom: 3,
    paddingLeft: 5,
},

});

export default PinsAndAEDs;
