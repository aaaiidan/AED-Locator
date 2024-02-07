import React, {useEffect} from "react";
import {Image, Platform, TouchableOpacity} from "react-native";

const AEDImageContainer = ( { style, onPress, base64Image } ) => {

   
    const imageSource = base64Image ? { uri: base64Image } : require('../../assets/images/placeholder_aed.png');

    

    return (
        <TouchableOpacity style={style} onPress={onPress}>
            <Image
            source={ imageSource}
            style={{height: '100%', width: '100%'}}
            />
        </TouchableOpacity>
      );
}



export default AEDImageContainer;