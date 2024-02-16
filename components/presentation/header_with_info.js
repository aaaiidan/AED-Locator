import React, {useState} from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import ImageTextButton from '../touchables/image_text_button';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import styles from '../../styles';

const screenHeight = Dimensions.get('window').height
const HeaderWithInfo = ({title, split = false, children, textContainerStyle}) => {

    return (
        <View style={[styles.headerInfoContainer]}>
            <View style={[styles.textContainer, textContainerStyle]}>
                <Text style={styles.title}>{title}</Text>
            </View>
            {split ? 
                <View style = {{flexDirection: 'row'}}>
                    {React.Children.map(children, (child, index) => (
                        <View style={[styles.textContainer, textContainerStyle]}>
                            {child}
                        </View>
                    ))}
                </View> 
            : 
                <View style={[styles.textContainer,  React.Children.count(children)==1 && children.type == TouchableOpacity ? {  paddingHorizontal: '5%',paddingVertical: '5%'} : null]}>
                    {children}
                </View>
            }

            
        </View>  
        
    );
};

export default HeaderWithInfo;
