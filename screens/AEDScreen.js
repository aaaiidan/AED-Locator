import * as React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
//import externalStyle from '../style/externalStyle';

const screenHeight = Dimensions.get('window').height

const AEDScreen = ({navigation}) => {

  return (
    <View style={styles.container}>
        <View style={styles.subContainer}>
            <Text>All AEDs</Text>
        </View>
    </View>
    
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#15202b',
        paddingHorizontal: (screenHeight * 0.025),
        paddingTop: (screenHeight * 0.025) ,
        paddingBottom: (screenHeight * 0.025),
    },
    subContainer: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#192734',
        height: '100%' ,
        width: '100%',
    },
   
});
    
export default AEDScreen;
