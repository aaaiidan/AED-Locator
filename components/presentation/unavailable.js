import React from 'react';
import { View, Text } from 'react-native';
import styles from '../../styles';

const Unavailable = ({text}) => {

    return (
        <View style={{flex:1, width:'100%', justifyContent: 'center', alignItems:'center', alignContent: 'center' }}>
            <Text style={styles.title}>{text ?? 'Unavailable'}</Text>
        </View>
        
    );
};

export default Unavailable;

