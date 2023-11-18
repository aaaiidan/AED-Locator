import React, {useState} from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
//import externalStyle from '../style/externalStyle';

const screenHeight = Dimensions.get('window').height
const HelpScreen = ({navigation}) => {

  const [modalAEDVisible, setModalAEDVisible] = useState(false);

  return (
    <View style={styles.container}>
        <TouchableOpacity style={{height: 100, width:100, backgroundColor:'#FFFFFF'}} onPress={ () => setModalAEDVisible(true)}>
          <Text>Open</Text>
        </TouchableOpacity>
    </View>
    
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#15202b',
    },
   
});

export default HelpScreen;
