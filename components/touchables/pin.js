import React from "react";
import {View, Image, StyleSheet, TouchableOpacity} from "react-native";

const PinIcon = ({style, navigation}) => (
        <TouchableOpacity  style={style} onPress={() => navigation.navigate('Map')}>
            <Image 
                source={require('../../assets/images/pin.png')}
                resizeMode='contain'
                style={{height: '100%', width: '100%'}}
            />
        </TouchableOpacity>
  );

export default PinIcon;
