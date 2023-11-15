import React, {useState} from 'react';
import { View, TouchableOpacity , Text, StyleSheet, TouchableHighlight, Button } from 'react-native';
import MapView from 'react-native-maps';
//import externalStyle from '../style/externalStyle';

const Home = ({navigation}) => {

  const [modalAEDVisible, setModalAEDVisible] = useState(false);

  return (
    <View style={styles.container}>
        <MapView style={styles.map}/>
        <TouchableOpacity style={{height: 100, width:100, backgroundColor:'#FFFFFF'}} onPress={ () => setModalAEDVisible(true)}>
          <Text>Open</Text>
        </TouchableOpacity>

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
    buttonContainer: {
        width: '100%',
        padding: 10,
    },
    map: {
      height:'100%',
      width:'100%',
    }
});

export default Home;
