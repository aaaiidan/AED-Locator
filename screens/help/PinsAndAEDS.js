import React, {useState} from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView, Image} from 'react-native';
import ImageTextButton from '../../components/touchables/image_text_button';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import HeaderWithInfo from '../../components/presentation/header_with_info';
//import externalStyle from '../style/externalStyle';
import ImageInsideInfo from '../../components/presentation/image_inside_info';

const screenHeight = Dimensions.get('window').height
const PinsAndAEDs = ({navigation}) => {

    return (
        <View style={styles.container}>
            <ScrollView>
                <HeaderWithInfo title={'Pins'} >

                    <Text style={styles.text}>On the map there are green pins representing each location of the Automated External Defribrillators (AEDS). Each pin, when pressed, provides information about the AED and its location. The information provided is as follows:</Text>
                    <Text style={styles.list}>1. Name</Text>
                    <Text style={styles.list}>2. Address</Text>
                    <Text style={styles.list}>3. Floor</Text>
                    <Text style={styles.list}>4. Opening Times</Text>
                    <Text style={styles.list}>5. Description</Text>
                    <Text style={styles.text}>6. Brand</Text>
                    <Text style={styles.text}>Directions to each AED are accessed, simply, by pressing on the directions button underneath the key information.</Text>

                    <ImageInsideInfo>
                            <Image
                                source={require('../../assets/images/locate.png')}
                                resizeMode='contain'
                                style={{ width: '100%', height: '100%',}}
                            />
                    </ImageInsideInfo>
                </HeaderWithInfo>

                <HeaderWithInfo title={'Directions'}>
                    <Text style={styles.text}>The aim of this application is to quickly and efficiently guide you, the user, to the nearest (or any) AED in case of an emergency.</Text>
                    <Text style={styles.text}>Once directions have been activated, a line betweeen your location and the AED will be displayed, alongside the direction and distance to follow. To cancel the directions, swipe up or down on the pop-up.</Text>
                </HeaderWithInfo>
                
            </ScrollView>
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
    text:{
        textAlign:'left',
        color: '#FFFFFF',
        fontSize: RFValue(14),
        marginBottom: '5%',
    },
    
    list:{
        textAlign:'left',
        color: '#FFFFFF',
        fontSize: RFValue(14),
    },

});

export default PinsAndAEDs;
