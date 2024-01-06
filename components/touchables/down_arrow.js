import React from "react";
import {Image, TouchableOpacity} from "react-native";

const DownArrowIcon = ( { style, onPress } ) => (
    <TouchableOpacity style={style} onPress={onPress}>
        <Image
        source={require('../../assets/images/down_arrow.png')}
        resizeMode='contain'
        style={{height: '100%', width: '100%'}}
        />
    </TouchableOpacity>
  );

export default DownArrowIcon;