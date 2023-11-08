import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Map = () => {
    return (
      <View style={styles.mapContainer}>
        <MapView style={styles.map}/>
      </View>
       
    );
  }
  
  const styles = StyleSheet.create({
    mapContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      height: (windowHeight * 0.3),
      width: (windowWidth * 0.9),
      backgroundColor: 'green',
      marginTop: (windowHeight * 0.05)
    },
    map: {
      height:'100%',
      width:'100%',
    },
  });
  
  export default Map;