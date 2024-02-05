import React, {useState} from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import ImageTextButton from '../touchables/image_text_button';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
//import externalStyle from '../style/externalStyle';

const screenHeight = Dimensions.get('window').height
const HeaderWithInfo = ({title, split = false, children}) => {

    return (
        <View style={styles.headerInfoContainer}>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{title}</Text>
            </View>
            {split ? 
                <View style = {styles.subContainer}>
                    {React.Children.map(children, (child, index) => (
                        <View style={styles.textContainer}>
                            {child}
                        </View>
                    ))}
                </View> 
            : 
                <View style={[styles.textContainer,  React.Children.count(children)==1 && children.type == TouchableOpacity ? {  paddingHorizontal: '5%',paddingVertical: '5%'} : null]}>
                    {children}
                </View>
            }

            <View>
                
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
    alignItems:'center' 
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

export default HeaderWithInfo;
