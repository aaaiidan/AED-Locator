import * as React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
//import externalStyle from '../style/externalStyle';

const screenHeight = Dimensions.get('window').height
const HelpScreen = ({navigation}) => {

  return (
    <View style={styles.container}>
        <Text>Hello</Text>
    </View>
    
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#15202b',
    },
   
});

export default HelpScreen;
