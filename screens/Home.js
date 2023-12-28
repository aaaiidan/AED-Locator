import React, {useEffect, useState} from 'react';
import { View, TouchableOpacity , Text, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';
import Modal from 'react-native-modal';
import AEDImageContainer from '../components/aed_image_container';
import LocateIcon from '../components/locate_icon';
import Animated, {  useSharedValue, useAnimatedStyle, withTiming, useAnimatedGestureHandler, interpolate, Extrapolate, runOnJS } from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../services/firebaseConfig';

const screenHeight = Dimensions.get('window').height;
const screenWdidth = Dimensions.get('window').width;
const placeholder_aed = require('../assets/images/placeholder_aed.jpg');
const image = Image.resolveAssetSource(placeholder_aed);
const closedY = 700;
const smallOpenY = 520;
const mediumOpenY = 175;
const fullOpenY = 0;
const addressOrder = ['AddressLine1', 'City', 'Postcode']

const Home = ({navigation}) => {

    // ==========================================
    // =        Animation of overlay            =
    // ==========================================

     //Variables for gesture handling
    const translateY = useSharedValue(closedY); // Initial position below the screen
    const gestureState = useSharedValue(fullOpenY);
    const velocityFlag = useSharedValue(false);
    const [mediumVisible, setmediumVisible] = useState(true);

    //Scrollview variables
    const [scrollEnabled, setScrollEnabled] = useState(false);
 
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
			translateY.value = Math.min(closedY, Math.max(0, currentY));

            if (translateY.value == 0){
                runOnJS(setScrollEnabled)(true)
            } else {
                runOnJS(setScrollEnabled)(false)
            }

            if(translateY.value < 500 && mediumVisible == false){
                runOnJS(setmediumVisible)(true)
            } else if ( translateY.value > 500 && mediumVisible == true){
                runOnJS(setmediumVisible)(false)
            }

			if (event.velocityY > 1000) {
                velocityFlag.value = true;
				translateY.value = withTiming(closedY); // Example: Snap to maxY if the swipe velocity is high
			} else {
                velocityFlag.value = false;
            }
			
		},
		onEnd: () => {

		  	gestureState.value = 0; // Gesture is inactive 
            if (!velocityFlag.value){
                if ( translateY.value < 325 && translateY.value > mediumOpenY - 50) { 
                    translateY.value = withTiming(mediumOpenY);
                } else if ( translateY.value > 325 && translateY.value < smallOpenY){
                    translateY.value = withTiming(smallOpenY);
                } else if (translateY.value > smallOpenY) {
                    translateY.value = withTiming(closedY);
                } else if ( translateY.value < mediumOpenY - 50){
                    translateY.value = withTiming(fullOpenY);
                }
            }

		},
	});

    //Starts animation of overlay
    const startAnimation = ( name, address) => {
        setAddress(addressOrder.map(key => address[key]));
        setName(name);
        console.log('yoooooo -', name, address, '---', getAddress)
        translateY.value = withTiming(smallOpenY , {duration:750}); // Slide up to position smallOpenY
    };

    //Toggle enhanced image visibility
    const toggleImageModal = () => {
        setModalVisible(!isModalVisible)
    }

    //Function that changes the y position of pop up depending on users swipe
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: translateY.value }],
        };
    });

    const smallViewOpacityChange = useAnimatedStyle(() => {
        const opacity = interpolate(translateY.value, [500, 450], [1, 0], Extrapolate.CLAMP);
        return {
        opacity,
        };
    });

    const mediumViewOpacityChange = useAnimatedStyle(() => {
        const opacity = interpolate(translateY.value, [500, 250], [0, 1], Extrapolate.CLAMP);
        return {
        opacity,
        };
    });
    
    const locateButtonStyle = useAnimatedStyle(() => {
        const yValue = interpolate(translateY.value, [750, 175], [600, 0], Extrapolate.CLAMP);
        return {
          transform: [{ translateY: yValue }],
        };
      });

    // ==========================================
    // =            Handling data               =
    // ==========================================

    const [aedData, setAedData] = useState(null);
    const [locationData, setLocationData] = useState(null);

    const [getAddress, setAddress] = useState([]);
    const [getName, setName] = useState('Unavailable');
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

    useEffect(() => {
        setRatio(screenWdidth/image.width); //Adjust enhanced image height depending on width

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
                <Animated.View style={[styles.smallView, smallViewOpacityChange]}>  
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
                    <View style={styles.infoContainer}>
                        <View>
                            <Text style={styles.name}>{getName}</Text >
                            {getAddress.map((value, index) => (
                                <Text key={index} style={styles.text}>{value}</Text>
                            ))}
                    </View>
                        <AEDImageContainer style={styles.aedSmall} onPress={toggleImageModal} />
                    </View>
                </Animated.View>
                {mediumVisible ? (
                    <Animated.View style={[styles.mediumView, mediumViewOpacityChange]}>
                        <AEDImageContainer style={styles.aedMedium} onPress={toggleImageModal} />
                        <ScrollView style={{flexGrow: 0, height: '60%'}} scrollEventThrottle={16} scrollEnabled={scrollEnabled}>
                            <View style={styles.mediumFullInfoContainer}>
                                <View style={styles.subContainer}>
                                    <View style={styles.textContainer}>
                                        <Text style={styles.name}>Name</Text>
                                    </View>
                                </View>

                                <View style={styles.subContainer}>
                                    <View style={styles.textContainer}>
                                        <Text style={styles.text}>John Anderson Building</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.mediumFullInfoContainer}>
                                <View style={styles.subContainer}>
                                    <View style={styles.textContainer}>
                                        <Text style={styles.name}>Address</Text>
                                    </View>
                                </View>
                                <View style={styles.subContainer}>
                                    <View style={styles.splitInfoContainer}> 
                                        <View style={styles.textContainer}>
                                            <Text style={styles.name}>Address</Text>
                                            <Text style={styles.text}>John Anderson Building</Text>
                                            <Text style={styles.text}>107 Rottenrow E</Text>
                                            <Text style={styles.text}>Glasgow</Text>
                                            <Text style={styles.text}>G4 0NG</Text>
                                        </View>
                                    </View>

                                    <View style={styles.splitInfoContainer}> 
                                        <View style={styles.textContainer}>
                                            <Text style={styles.name}>Floor</Text>
                                            <Text style={styles.text}>Level 5</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.mediumFullInfoContainer}>
                                <View style={styles.subContainer}>
                                    <View style={styles.textContainer}>
                                        <Text style={styles.name}>Opening Times</Text>
                                    </View>
                                </View>
                                <View style={styles.subContainer}>
                                    <View style={styles.splitInfoContainer}> 
                                        <View style={styles.textContainer}>
                                            <Text style={styles.name}>Day</Text>
                                            <Text style={styles.text}>Monday</Text>
                                            <Text style={styles.text}>Tuesday</Text>
                                            <Text style={styles.text}>Wednesday</Text>
                                            <Text style={styles.text}>Thursday</Text>
                                            <Text style={styles.text}>Friday</Text>
                                            <Text style={styles.text}>Saturday</Text>
                                            <Text style={styles.text}>Sunday</Text>
                                        </View>
                                    </View>

                                    <View style={styles.splitInfoContainer}> 
                                        <View style={styles.textContainer}>
                                        <Text style={styles.name}></Text>
                                            <Text style={styles.text}>9:00 - 17:00</Text>
                                            <Text style={styles.text}>9:00 - 17:00</Text>
                                            <Text style={styles.text}>9:00 - 17:00</Text>
                                            <Text style={styles.text}>9:00 - 17:00</Text>
                                            <Text style={styles.text}>9:00 - 17:00</Text>
                                            <Text style={styles.text}>9:00 - 17:00</Text>
                                            <Text style={styles.text}>9:00 - 17:00</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.mediumFullInfoContainer}>
                                <View style={styles.subContainer}>
                                    <View style={styles.textContainer}>
                                        <Text style={styles.name}>Opening Times</Text>
                                    </View>
                                </View>
                                <View style={styles.subContainer}>
                                    <View style={styles.splitInfoContainer}> 
                                        <View style={styles.textContainer}>
                                            <Text style={styles.name}>Day</Text>
                                            <Text style={styles.text}>Monday</Text>
                                            <Text style={styles.text}>Tuesday</Text>
                                            <Text style={styles.text}>Wednesday</Text>
                                            <Text style={styles.text}>Thursday</Text>
                                            <Text style={styles.text}>Friday</Text>
                                            <Text style={styles.text}>Saturday</Text>
                                            <Text style={styles.text}>Sunday</Text>
                                        </View>
                                    </View>

                                    <View style={styles.splitInfoContainer}> 
                                        <View style={styles.textContainer}>
                                        <Text style={styles.name}></Text>
                                            <Text style={styles.text}>9:00 - 17:00</Text>
                                            <Text style={styles.text}>9:00 - 17:00</Text>
                                            <Text style={styles.text}>9:00 - 17:00</Text>
                                            <Text style={styles.text}>9:00 - 17:00</Text>
                                            <Text style={styles.text}>9:00 - 17:00</Text>
                                            <Text style={styles.text}>9:00 - 17:00</Text>
                                            <Text style={styles.text}>9:00 - 17:00</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.mediumFullInfoContainer}>
                                <View style={styles.subContainer}>
                                    <View style={styles.textContainer}>
                                        <Text style={styles.name}>Opening Times</Text>
                                    </View>
                                </View>
                                <View style={styles.subContainer}>
                                    <View style={styles.splitInfoContainer}> 
                                        <View style={styles.textContainer}>
                                            <Text style={styles.name}>Day</Text>
                                            <Text style={styles.text}>Monday</Text>
                                            <Text style={styles.text}>Tuesday</Text>
                                            <Text style={styles.text}>Wednesday</Text>
                                            <Text style={styles.text}>Thursday</Text>
                                            <Text style={styles.text}>Friday</Text>
                                            <Text style={styles.text}>Saturday</Text>
                                            <Text style={styles.text}>Sunday</Text>
                                        </View>
                                    </View>

                                    <View style={styles.splitInfoContainer}> 
                                        <View style={styles.textContainer}>
                                        <Text style={styles.name}></Text>
                                            <Text style={styles.text}>9:00 - 17:00</Text>
                                            <Text style={styles.text}>9:00 - 17:00</Text>
                                            <Text style={styles.text}>9:00 - 17:00</Text>
                                            <Text style={styles.text}>9:00 - 17:00</Text>
                                            <Text style={styles.text}>9:00 - 17:00</Text>
                                            <Text style={styles.text}>9:00 - 17:00</Text>
                                            <Text style={styles.text}>9:00 - 17:00</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                   </Animated.View>
                ) : null }
                <View style={styles.curvedIcon}/>
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
        height: '100%',
        width: '100%',
        backgroundColor: '#15202b',
        paddingLeft: (screenHeight * 0.0125),
        paddingRight: (screenHeight * 0.0125),
        paddingBottom: (screenHeight * 0.0125),
        position:'absolute',
    },
  

    smallView: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '14%',
        width: '100%',
        position:'absolute',
        marginTop:(screenHeight * 0.025) ,
    },

    mediumView: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '100%',
        width: '100%',
        position:'absolute',
    },
  
    aedSmall: {
        height: '80%',
        aspectRatio: 1,
        borderRadius: 100,
        overflow: 'hidden',
        borderColor: '#FFFFFF',
        borderWidth: 2,
        marginTop: '5%',
        marginBottom: '5%',
    },

    aedMedium: {
        height: '20%',
        aspectRatio: 1,
        borderRadius: 100,
        overflow: 'hidden',
        borderColor: '#FFFFFF',
        borderWidth: 2,
        marginTop: '5%',
        marginBottom: '5%',
    },
  
    infoContainer:{
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: '#192734',
        height: '100%' ,
        width: '100%',
        paddingLeft: '5%',
        paddingRight: '5%'
    },

    mediumFullInfoContainer: {
        flexDirection: 'column',
        width: '100%',
        marginBottom: '5%',
      },

    subContainer: {
        minHeight: 25,
        flexDirection: 'row',
        backgroundColor: '#192734',
        marginBottom: 3,
        paddingLeft: 5,
    },

    splitInfoContainer:{
        alignContent: 'center',
        width: '50%',
    },
  
    locateButton:{
        alignItems: 'center',
        justifyContent: 'center',
        width: '40%',
        height: '100%',
        backgroundColor: '#018489',
        marginBottom: (screenHeight * 0.025),
        borderRadius: 10,
    },
  
      textContainer:{
        justifyContent: 'center',
    },
  
    text:{
        textAlign:'left',
        color: '#FFFFFF',
        fontSize: 13,
    },

    name:{
        textAlign:'left',
        color: '#FFFFFF',
        fontSize: 13,
        fontWeight: 'bold',
        marginBottom: '2%'
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
        position: 'absolute',
    },

});

export default Home;
