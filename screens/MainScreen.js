import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import Map from '../components/map';

const Main = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Map/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});

export default Main;