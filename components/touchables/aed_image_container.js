import React from "react";
import {Image, TouchableOpacity} from "react-native";

const AEDImageContainer = ( { style, onPress, base64Image } ) => {

    const isValidBase64Uri = base64Image && base64Image.startsWith('data:image');
    const imageSource = base64Image && isValidBase64Uri ? { uri: base64Image } : require('../../assets/images/placeholder_aed.png');

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