import React from "react";
import {Image, TouchableOpacity} from "react-native";

const AEDImageContainer = ( { style, onPress, imageObj } ) => (
    
    <TouchableOpacity style={style} onPress={onPress}>
        <Image
        source={require('../assets/images/placeholder_aed.png')}
        style={{height: '100%', width: '100%'}}
        />
    </TouchableOpacity>
  );

export default AEDImageContainer;