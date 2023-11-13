import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View, Dimensions } from 'react-native';

//const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Map = () => {
    return (
      <MapView style={styles.map}/>
    );
  }
  
  const styles = StyleSheet.create({
    mapContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'green',
      marginTop: (windowHeight * 0.05)
    },
    map: {
      height:'100%',
      width:'100%',
    },
  });
  
  export default Map;