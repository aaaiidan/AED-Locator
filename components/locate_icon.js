import React from "react";
import {View, Image, StyleSheet, TouchableOpacity} from "react-native";

const LocateIcon = ({style}) => (
        <TouchableOpacity  style={style}>
            <Image 
                source={require('../assets/images/locate.png')}
                resizeMode='contain'
                style={{height: '80%', width: '100%'}}
            />
        </TouchableOpacity>
  );

export default LocateIcon;
