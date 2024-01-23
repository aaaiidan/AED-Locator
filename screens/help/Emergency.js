import React, {useState} from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView, Image } from 'react-native';
import ImageTextButton from '../../components/touchables/image_text_button';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import HeaderWithInfo from '../../components/presentation/header_with_info';
//import externalStyle from '../style/externalStyle';
import ImageInsideInfo from '../../components/presentation/image_inside_info';

const screenHeight = Dimensions.get('window').height
const EmergencyHelp = ({navigation}) => {

    return (
        <View style={styles.container}>
            <ScrollView>
                <HeaderWithInfo title={'Emergency Screen'}>
                    <Text style={styles.text}>Pressing the emergency button at the bottom center of the screen will display the emergency screen. In this screen there is an option for contacting emergency services and an option for performing CPR.</Text>
                    <Text style={styles.text}>On the emergency services section, there is detailed instructions on what to do if you or someone else is experiencing symptoms of a heart attack. Option to call Campus Secuirty and Emergency Services are available.</Text>
                    <Text style={styles.text}>On the CPR section, there are detailed instructions on how to perform CPR following NHS guidelines.</Text>
                </HeaderWithInfo>

                <HeaderWithInfo  title={'Campus Security'}>
                    <Text style={styles.text}>The University Security staff are qualified to provide first aid on campus 24 hours a day</Text>
                </HeaderWithInfo>

                <HeaderWithInfo title={'Emergency Services'}>
                    <Text style={styles.text}>If someone is unconscious and not breathing normally, call 999 and start CPR straight away.</Text>
                    <Text style={styles.text}>When you call 999 for an ambulance, you should be given basic life-saving instructions over the phone, including advice about CPR.</Text>
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

export default EmergencyHelp;
