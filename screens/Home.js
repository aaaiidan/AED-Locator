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
import AnimatedViewOverlay from '../components/animatedViewOverlay';

const screenHeight = Dimensions.get('window').height;
const screenWdidth = Dimensions.get('window').width;
const placeholder_aed = require('../assets/images/placeholder_aed.jpg');
const image = Image.resolveAssetSource(placeholder_aed);
const intialY = 900;
const maxY = 0;

const Home = ({navigation}) => {

    const [getAddress, setAddress] = useState('Unavailable');
    const [getName, setName] = useState('Unavailable');
    const [getOpeningTimes, setOpeningTimes] = useState('');

    //Variables for gesture handling
    const translateY = useSharedValue(intialY); // Initial position below the screen
    const gestureState = useSharedValue(maxY);
    const velocityFlag = useSharedValue(false);

    //Variables for image modal
    const [isModalVisible, setModalVisible] = useState(false);
    const [ratio, setRatio] = useState(0);

    // Function to handle swiping animation
    const onGestureEvent = useAnimatedGestureHandler({
        onStart: (_, ctx) => {
            ctx.startY = translateY.value; // ctx is object that stores phases of gesture (y value)
            gestureState.value = 1; // Gesture is active 
        },
        onActive: (event, ctx) => {
            const currentY = ctx.startY + event.translationY;
        translateY.value = Math.min(550, Math.max(0, currentY));

        if (event.velocityY > 1000) {
            velocityFlag.value = true;
            translateY.value = withTiming(intialY); // Example: Snap to maxY if the swipe velocity is high
        } else {
            velocityFlag.value = false;
        }
        
        },
        onEnd: () => {
            gestureState.value = 0; // Gesture is inactive 
            if (!velocityFlag.value){
            if ( translateY.value < 350) {
                translateY.value = withTiming(maxY);
            } else if (translateY.value > 350) {
                translateY.value = withTiming(intialY);
            }
            }
        },
        });

          //Function that starts animation of pop up
    const startAnimation = ( name, address) => {
        setAddress(Object.values(address));
        setName(name);
        console.log(name, address)
        translateY.value = withTiming(0 , {duration:750}); // Slide up to position 0

    };

    //Function that changes the y position of pop up depending on users swipe
    const animatedStyle = useAnimatedStyle(() => {
        return {
        transform: [{ translateY: translateY.value }],
        };
    });

    //Toggle enhanced image visibility
    const toggleImageModal = () => {
        setModalVisible(!isModalVisible)
    }

        //Adjust enhanced image height depending on width
    useEffect(() => {
        setRatio(screenWdidth/image.width)
    },[]);

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
        <PanGestureHandler onGestureEvent={onGestureEvent}>
            <Animated.View style={[styles.animatedView, animatedStyle]}>
                <Modal 
                    style={styles.modalImage}
                    useNativeDriver={true}
                    animationIn='fadeIn'
                    animationOut='fadeOut'
                    isVisible={isModalVisible}
                    hideModalContentWhileAnimating
                    onBackButtonPress={toggleImageModal}
                    onBackdropPress={toggleImageModal}
                    backdropOpacity={0.9}
                >
                <Image 
                    source={placeholder_aed}
                    resizeMode='contain'
                    style={{ width: '100%', height: image.height * ratio}}
                />
                </Modal>
                <View style={styles.curvedIcon}>
                </View>
                <View style={styles.infoContainer}>
                    <View style={styles.textContainer}>
                        <Text style={styles.name} adjustsFontSizeToFit >{getName}</Text >
                        {getAddress.map((value, index) => (
                            <Text key={index} style={styles.text} adjustsFontSizeToFit>{value}</Text>
                        ))}
                    </View>
                    <AEDImageContainer style={styles.aed} onPress={toggleImageModal} />
                </View>
            </Animated.View>
        </PanGestureHandler>
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
        height: '20%',
        width: '100%',
        backgroundColor: '#15202b',
        paddingLeft: (screenHeight * 0.0125),
        paddingRight: (screenHeight * 0.0125),
        paddingBottom: (screenHeight * 0.0125),
        position:'absolute',

      },
  
      downArrow: {
        width: '10%',
        aspectRatio:1
      },
  
      aed: {
        height: '80%',
        aspectRatio: 1,
        borderRadius: 100,
        borderWidth: 2,
        overflow: 'hidden',
        borderColor: '#FFFFFF',
        marginTop: '5%',
        marginBottom: '5%',
      },
  
      infoContainer:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: '#192734',
        height: '100%' ,
        width: '100%',
        paddingLeft: '5%',
        paddingRight: '5%'
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
  
      textContainer:{
        width: '70%',
        justifyContent: 'center',
    
      },
  
      text:{
        textAlign:'left',
        color: '#FFFFFF',
        fontSize: 15,
      },

      name:{
        textAlign:'left',
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold'
      },
  
      

      modalImage: {
        margin: 0,
        alignItems: 'center',
        justifyContent: 'center',
      },

      curvedIcon: {
        marginBottom:(screenHeight * 0.025),
        marginTop:((screenHeight * 0.0125) /2 ) - 2 ,
        backgroundColor: '#FFFFFF',
        width: 50,
        height: 4,
        borderRadius: 100,
      },

});

export default Home;
