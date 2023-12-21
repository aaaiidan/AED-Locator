import React, {useEffect, useState} from 'react';
import { View, TouchableOpacity , Text, StyleSheet, Image, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';
import Modal from 'react-native-modal';
import DownArrowIcon from '../components/down_arrow';
import AEDImageContainer from '../components/aed_image_container';
import LocateIcon from '../components/locate_icon';
import Animated, {  useSharedValue, useAnimatedStyle, withTiming, useAnimatedGestureHandler } from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../services/firebaseConfig';

const screenHeight = Dimensions.get('window').height

const Home = ({navigation, startAnimation}) => {

    console.log('yooo' + typeof startAnimation);
    const [getAddress, setAddress] = useState('Unavailable');
    const [getOpeningTimes, setOpeningTimes] = useState('');

    const loadData = async (collectionName) => {
        try{
            const querySnapshot = await getDocs(collection(db, collectionName));
            const queryDocs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data()}));
            return queryDocs

        } catch (error) {
            console.error("error fetching data: ", error);
        }
    }

    const [aedData, setAedData] = useState(null);
    const [locationData, setLocationData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const locations = await loadData('Locations');
                const aeds = await loadData('Aeds');
                setLocationData(locations);
                setAedData(aeds);
            } catch (error) {

            }        
        }
        fetchData();
        console.log(locationData)
    },[]);

    return (
    <View style={styles.container}>
        <MapView 
            style={styles.map}
            showsUserLocation={true}
            initialRegion={{
                latitude: 55.8621133244897,
                longitude: -4.2423899331605615,
                latitudeDelta: 0.01,
                longitudeDelta: 0.005,
            }}   
        >
            {locationData && locationData.map((location, index) => {
                console.log(location.Name, location.Coordinates, location.Address); // Corrected syntax
                return (
                    <Marker
                        key={location.id}
                        title={location.Name}
                        coordinate={{latitude: location.Coordinates.latitude, longitude: location.Coordinates.longitude}}
                        anchor={{ x: 0.5, y: 1 }}
                        centerOffset={{ x: 0, y: -33 }}
                        onPress={() => startAnimation(location.Name, location.Address)}
                    >
                        <Image 
                            source={ require('../assets/images/aedMarker2.png')}
                            resizeMode='contain'
                            style={{height: 66, width: 44}}
                        />
                    </Marker>
                );
            })}
        </MapView>
        <View style={styles.buttonContainer}>
            <TouchableOpacity  style={styles.button} >
                <Image 
                    source={require('../assets/images/nearby.png')}
                    resizeMode='contain'
                    style={{height: '100%', width: '25%'}}
                />
                <Text style={{textAlign: 'center', color: '#FFFFFF'}}>Nearest AED</Text>
            </TouchableOpacity>
        </View>
    </View>
        
    );
    };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'flex-end',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        backgroundColor: '#15202b',
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        width: '55%',
        height: '20%',
        position: 'absolute',
    },
    button:{
        alignItems: 'center',
        justifyContent:'space-between',
        flexDirection: 'row',
        backgroundColor: '#018489',
        width:'100%',
        height: '60%',
        borderRadius: 100,
        paddingLeft:'10%',
        paddingRight: '10%'

    },
    map: {
      height:'100%',
      width:'100%',
    },
    
      animatedView: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '90%',
        width: '100%',
        backgroundColor: '#15202b',
        paddingLeft: (screenHeight * 0.025),
        paddingRight: (screenHeight * 0.025),
        paddingBottom: (screenHeight * 0.025),
        position:'absolute',
        
        
      },
  
      downArrow: {
        width: '10%',
        aspectRatio:1
      },
  
      aed: {
        height: '25%',
        aspectRatio: 1,
        borderRadius: 100,
        overflow: 'hidden',
        borderColor: '#FFFFFF',
        borderWidth: 5,
        marginTop: '5%',
        marginBottom: '5%',
      },
  
      infoContainer:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#192734',
        height: '100%' ,
        width: '100%',
      },
  
      locateButton:{
        alignItems: 'center',
        justifyContent: 'center',
        width: '35%',
        height: '20%',
        backgroundColor: '#018489',
        marginBottom: (screenHeight * 0.025),
        borderRadius: 32,
       
      },
  
      openingTimesContainer:{
        width: '100%',
        justifyContent: 'center',
        flexDirection: 'row',
      },
  
      address:{
        textAlign:'center',
        marginTop: (screenHeight * 0.025),
        color: '#FFFFFF',
        fontSize: 20,
      },
  
      days:{
        textAlign:'left',
        color: '#FFFFFF',
        fontSize: 20,
      },
  
      times:{
        textAlign:'left',
        color: '#FFFFFF',
        fontSize: 20,
      },

      modalImage: {
        margin: 0,
        alignItems: 'center',
        justifyContent: 'center',
      },
});

export default Home;
