import React from 'react';
import { View, Dimensions } from 'react-native';
import styles from '../../styles';

const screenHeight = Dimensions.get('window').height
const ImageInsideInfo = ({children}) => {

    return (
        <View style={styles.imageInsideInfo}>
            {React.Children.map(children, (child, index) => (
                <View style={styles.imageBorder}>
                    {child}
                </View>
                ))}
        </View>
        
    );
};

export default ImageInsideInfo;

