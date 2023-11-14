import * as React from 'react';
import { View, Image, Text, StyleSheet, Dimensions } from 'react-native';
import PinIcon from '../components/pin';
//import externalStyle from '../style/externalStyle';

const screenHeight = Dimensions.get('window').height

const AEDScreen = ({navigation}) => {

  return (
    <View style={styles.container}>
        <View style={styles.subContainer}>
           
           <PinIcon style={styles.pin}/>
           <PinIcon style={styles.pin}/>
           <PinIcon style={styles.pin}/>
           <PinIcon style={styles.pin}/>
           <PinIcon style={styles.pin}/>
           
           
        </View>
    </View>
    
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#15202b',
        paddingLeft: (screenHeight * 0.025),
        paddingRight: (screenHeight * 0.025),
        paddingTop: (screenHeight * 0.025) ,
        paddingBottom: (screenHeight * 0.025),
    },
    subContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
        flexDirection: 'row',
        backgroundColor: '#192734',
        height: '100%' ,
        width: '100%',
    },
    pin : {
        width: '50%',
        height: '33.33%',
        marginBottom: '22%',
    }
   
});
    
export default AEDScreen;
