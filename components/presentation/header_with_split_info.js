import React, {useState} from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import ImageTextButton from '../touchables/image_text_button';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
//import externalStyle from '../style/externalStyle';

const screenHeight = Dimensions.get('window').height
const HeaderWithSplitInfo = ({title}) => {

    return (
        <View style={styles.headerInfoContainer}>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{title}</Text>
            </View>
            <View style={[styles.subContainer2, { marginBottom: '5%', height: '45%'}]}>
              
                
            </View>

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
    paddingHorizontal: '2%',
    paddingVertical: '1%',
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
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
    flexDirection: 'row',
    backgroundColor: '#192734',
},

});

export default HeaderWithSplitInfo;
