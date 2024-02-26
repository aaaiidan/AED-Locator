import React, {useEffect, useRef, useState} from 'react';
import { View, TouchableOpacity , Text, Image, Dimensions, ScrollView } from 'react-native';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';
import Modal from 'react-native-modal';
import AEDImageContainer from '../components/touchables/aed_image_container';
import Animated, {  useSharedValue, useAnimatedStyle, withTiming, useAnimatedGestureHandler, interpolate, Extrapolate, runOnJS, withRepeat, withSequence } from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import MapViewDirections from 'react-native-maps-directions';
import * as Location from 'expo-location';
import LocateIcon from '../components/touchables/locate_icon';
import haversine from 'haversine';
import HeaderWithInfo from '../components/presentation/header_with_info';
import { useData } from '../DataContext';
import styles from '../styles';
import ImageInsideInfo from '../components/presentation/image_inside_info';

const screenHeight = Dimensions.get('window').height;
const screenWdidth = Dimensions.get('window').width;
const placeholder_aed = require('../assets/images/placeholder_aed.png');
const image = Image.resolveAssetSource(placeholder_aed);
const addressOrder = ['AddressLine1', 'City', 'Postcode']
const openingTimesOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const Home = ({navigation, route}) => {
    const [containerHeight, setContainerHeight] = useState(screenHeight);

    const onContainerLayout = (event) => {
        const { height } = event.nativeEvent.layout;
        setContainerHeight(height);
        console.log(containerHeight)
    }

    const closedY = (100 / 100) * containerHeight; //0% of screen

    const minSmallY = (90/100) * containerHeight; //10% of screen
    const smallOpenY = (80/ 100) * containerHeight; //20% of screen
    const maxSmallY = (60/100) * containerHeight; //40% of screen

    const mediumOpenY = (40/ 100) * containerHeight; //60% of screen

    const directionOpenY = (70/ 100) * containerHeight;

    const fullOpenY = 0; //100% of screen

    // ==========================================
    // =        Animation of overlay            =
    // ==========================================
    const [displayDirections, setDisplayDirections] = useState(false);
   

     //Variables for gesture handling
    const translateY = useSharedValue(closedY); // Initial position below the screen
    const previousTranslateY = useSharedValue(closedY);
    const gestureState = useSharedValue(fullOpenY);
    const velocityFlag = useSharedValue(false);
    const [fullOpenVisible, setFullOpenVisible] = useState(false);

    const cprScale = useSharedValue(1)
    const [cprAnimationActive, setCprAnimationActive] = useState(false);

    //Scrollview variables
    const [scrollEnabled, setScrollEnabled] = useState(false);
 
     //Variables for image modal
    const [isModalVisible, setModalVisible] = useState(false);
    const [ratio, setRatio] = useState(0);

    const [isPositive, setIsPositive] = useState(true);

    const [atDestination, setAtDestination]  = useState(false);

     // Function to handle swiping animation
     const onGestureEvent = useAnimatedGestureHandler({
		onStart: (_, ctx) => {
		  	ctx.startY = translateY.value; // ctx is object that stores phases of gesture (y value)
            ctx.lastDirectionChangeY = 0;
		  	gestureState.value = 1; // Gesture is active 
            
            
		},
		onActive: (event, ctx) => {
		  	const currentY = ctx.startY + event.translationY;
			translateY.value = Math.min(closedY, Math.max(0, currentY));

            if (translateY.value == 0){
                runOnJS(setScrollEnabled)(true);
            } else {
                runOnJS(setScrollEnabled)(false)
            }

            if(translateY.value < (80/100) * containerHeight && !fullOpenVisible && !atDestination){
                runOnJS(setFullOpenVisible)(true)
            }


			if (event.velocityY > 2000) {
                velocityFlag.value = true;
				translateY.value = withTiming(closedY); 

                runOnJS(setDisplayDirections)(false);
             
			} else {
                velocityFlag.value = false;
            }

            
            if (previousTranslateY.value > translateY.value){
                runOnJS(setIsPositive)(true);
            } else if (previousTranslateY.value < translateY.value) {
                runOnJS(setIsPositive)(false);
            }

            if(translateY.value !== previousTranslateY.value){
                previousTranslateY.value = translateY.value
            }

			
		},
		onEnd: (_, ctx) => {

		  	gestureState.value = 0; // Gesture is inactive 
            ctx.lastDirectionChangeY = translateY.value;
            if (!velocityFlag.value){
                 if (displayDirections) {
                    if (translateY.value > (75/100) * containerHeight) { // 75% to 100% - Close
                        translateY.value = withTiming(closedY);
                        runOnJS(setDisplayDirections)(false);
                        runOnJS(setFullOpenVisible)(false)
                    } else if (translateY.value < (75/100) * containerHeight && translateY.value > (65/100)*containerHeight) { 
                        translateY.value = withTiming(directionOpenY);
                    } else  {
                        translateY.value = withTiming(fullOpenY);
                        runOnJS(setDisplayDirections)(false);
                    }
               // }else if(atDestination){
                   // if(translateY.value > (30/100) * containerHeight){
                     //   translateY.value = withTiming(closedY);
                     //   runOnJS(setAtDestination(false))
                  //  } else {
                     //   translateY.value = withTiming(fullOpenY);
                   // }
                } else {
                    



                    if(translateY.value > (85/100) * containerHeight){ // 85% to 100%
                        translateY.value = withTiming(closedY);
                        runOnJS(setFullOpenVisible)(false)
                    } else if(translateY.value >= (75/100) * containerHeight && translateY.value < (85/100) * containerHeight){ //75% to 85%
                        translateY.value = withTiming(smallOpenY);
                        runOnJS(setFullOpenVisible)(false)
                    } else if (translateY.value < (75/100) * containerHeight && isPositive){ //less than 75% && postive
                        translateY.value = withTiming(fullOpenY);
                    } else if (translateY.value > (30/100) * containerHeight && !isPositive){ //less than 30% && negative direction
                        translateY.value = withTiming(smallOpenY);
                        runOnJS(setFullOpenVisible)(false)
                    } else {  
                        translateY.value = withTiming(fullOpenY);
                    }
                }
            }
		},
	});


    const onDestination = () =>{
     
        translateY.value = withTiming(fullOpenY);
        setDisplayDirections(false);
        setAtDestination(true);
        
    }

    //Starts animation of overlay
    const startAnimation = () => {
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

    //Changes the opacity from 1 to 0 as the animated view moves upwards
    const smallViewOpacityChange = useAnimatedStyle(() => {
        const opacity = interpolate(translateY.value, [smallOpenY, maxSmallY], [1, 0], Extrapolate.CLAMP);
        return {
        opacity,
        };
    });

    //Changes the opacity from 0 to 1 as the animated view moves upwards
    const fullOpenViewOpacityChange = useAnimatedStyle(() => {
        const opacity = interpolate(translateY.value, [(65/100) * containerHeight, (30/100) * containerHeight], [0, 1], Extrapolate.CLAMP);
        return {
        opacity,
        };
    });

    //Changes the opacity from 0 to 1 as the animated view moves upwards
    const directonViewOpacityChange = useAnimatedStyle(() => {
        const opacity = interpolate(translateY.value, [(60/100) * containerHeight, directionOpenY], [0, 1], Extrapolate.CLAMP);
        return {
        opacity,
        };
    });
    
    const locateButtonStyle = useAnimatedStyle(() => {
        const yValue = interpolate(translateY.value, [(750/ 812) * screenHeight, (175/ 812) * screenHeight], [600, 0], Extrapolate.CLAMP);
        return {
          transform: [{ translateY: yValue }],
        };
      });

    const cprImageStyle = useAnimatedStyle(() => {
        return{
            transform: [{scale: cprScale.value}]
        }
    });

    const directionViewChange = () => {
        translateY.value = withTiming(directionOpenY , {duration:750}); // Slide up to position smallOpenY
        markerRegion( {latitude: 55.8621133244897, longitude: -4.2423899331605615 }, {latitudeDelta: 0.01, longitudeDelta: 0.005}, 2000);

        setTimeout(() => {
            
            markerRegion(userLocation, {latitudeDelta: 0.01, longitudeDelta: 0.005,}, 2000); 
        }, 2500); 

    };

    const cprAnimation = () =>{
        setCprSoundActivated(!cprSoundActivated)
        setCprAnimationActive(!cprAnimationActive)
    }

    useEffect(() => {
        if(cprAnimationActive){
            console.log('start animation')
            cprScale.value = withRepeat(
                withSequence(
                    withTiming(1.2, { duration: 545 }),
                    withTiming(1, { duration:  545 })
                ),
                -1, // Infinite repeats
            );
        } else {
            // Stop animation
            cprScale.value = withTiming(1, { duration: 500 }); // Reset to original scale
        }
    }, [cprAnimationActive]);


    useEffect(() => {

        if(route.params){
            console.log(route.params)
            if (route.params.action == 'closest') {
                setTimeout(() => {
                    closestAED();
                }, 1); 
            } else if (route.params.action) {
                markerSetup(route.params.action)
            }
        }
    }, [route.params]);


    // ==========================================
    // =            Handling data               =
    // ==========================================
    const{ locations, aeds, imagesBase64, cprSoundActivated, setCprSoundActivated } = useData();

    const [getAddress, setAddress] = useState([]);
    const [getName, setName] = useState('Unavailable');
    const [getOpeningTimes, setOpeningTimes] = useState([]);

    const [getBrand, setBrand] = useState('-');
    const [getDesc, setDesc] = useState('-');
    const [getFloor, setFloor] = useState('-');
    const [getImg, setImg] = useState(null);

    const [distance, setDistance] = useState(null);
    const [maneuver, setManeuver] = useState(null);

   

    const formatData = (location) => {
        setAddress(addressOrder.map(key => location.Address[key]));

        setOpeningTimes(
            openingTimesOrder.map(key => {
                if(location.OpeningTimes[key]['Open'] == 'Closed' || location.OpeningTimes[key]['Open'] == 'Open 24 hours'){
                    return location.OpeningTimes[key]['Open']
                } else {
                    return location.OpeningTimes[key]['Open'] + ' - ' + location.OpeningTimes[key]['Close']
                }
                       
            })
        );

        setName(location.Name);
        setDestination(location.Coordinates);
       // console.log('after load - ', destination);

        aeds.some(aed => {
            if(aed.LocationRef.id == location.id){
                console.log('111111111111111', aed.LocationRef);
                setBrand(aed.Brand != null ? aed.Brand : '-');
                setDesc(aed.Description != null ? aed.Description : '-');
                setFloor(aed.FloorLevel != null ? 'Level ' + aed.FloorLevel : '-');
                setImg(aed.id in imagesBase64 ? imagesBase64[aed.id] : null)
                return true;
            }
            return false;
        });
       //console.log(getBrand, getDesc, getFloor, getImg);
    }

    const markerSetup = (location) => {

        setDisplayDirections(false);
        markerRegion(location.Coordinates, {latitudeDelta:0.002, longitudeDelta: 0.002}, 1000);
        formatData(location);
        startAnimation();

    }


    useEffect(() => {
        setRatio(screenWdidth/image.width); //Adjust enhanced image height depending on width
        setCprAnimationActive(cprSoundActivated);
    },[]);

    useEffect(() => {
        
        Object.entries(imagesBase64).forEach(([key, value]) => {
            console.log(key); 
        });
    }, [imagesBase64]);
    

   

    // ==========================================
    // =         Handling user Location         =
    // ==========================================
    
    const [userLocation, setUserLocation] = useState(null);
    const [destination, setDestination] = useState(null)
    const GOOGLE_MAPS_APIKEY = 'AIzaSyCOdUUIs58JDt-_CRVEBEf70hUnpH7-4tE'

    const region = {
        latitude: 55.8621133244897,
        longitude: -4.2423899331605615,
        latitudeDelta: 0.01,
        longitudeDelta: 0.005,
    };

    const mapRef = useRef(null);

    const getLocation = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
            Location.watchPositionAsync(
                {accuracy: Location.Accuracy.BestForNavigation, timeInterval: 100, distanceInterval: 0 },
                (newLocation) => {
                    setUserLocation({
                        latitude: newLocation.coords.latitude, 
                        longitude: newLocation.coords.longitude
                    });
                    //console.log('expected -', newLocation)
                }
            );
        }
    };

    markerRegion = (location, delta, duration) => {
        mapRef.current.animateToRegion({
            ...region,
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: delta.latitudeDelta,
            longitudeDelta: delta.longitudeDelta,
        }, duration)
    };

    useEffect(() => {
        getLocation();
    }, []);

    const onDirectionReady = (result) => {
         // Extract legs and steps from the result
         const legs = result.legs ;
         setDistance(legs[0].steps[0].distance.text);
         setManeuver(legs[0].steps[1].maneuver);

        legs.forEach((leg) => {
            const steps = leg.steps ;
            steps.forEach((step) => {
               // console.log('steps - ', step);
            });
        });
      };

    const startDirections = () => {
            setDisplayDirections(true);
            directionViewChange();
    };

    const closestAED = () => {
        let min = Infinity;
        let minAED = null;
        locations && locations.map((location, index) => {
            const distance = haversine(userLocation, location.Coordinates, {unit: 'meter'})
            if(min > distance){
                min = distance
                minAED = location
           }
        })
        markerSetup(minAED);
    }

    useEffect(() => {
        if (userLocation != null && destination != null && displayDirections){
            const distance = haversine(userLocation, destination, {unit: 'meter'})
            if(distance < 40){
                onDestination();
            }
        }
    }, [userLocation]);
    

    return (
    <View style={styles.homeContainer} onLayout={onContainerLayout}>
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
                source={getImg ? { uri: getImg } : placeholder_aed}
                resizeMode='contain'
                style={{ width: '100%', height: image.height * ratio}}
            />
        </Modal>
        <MapView 
            style={styles.allAvailableSpace}
            ref={mapRef}
            showsUserLocation={true}
            region={region} 
            provider='google'
            scrollEnabled={true}
            followsUserLocation={!displayDirections}
        >
            {locations && locations.map((location, index) => {
                return (
                    <Marker
                        key={location.id}
                        coordinate={{latitude: location.Coordinates.latitude, longitude: location.Coordinates.longitude}}
                        anchor={{ x: 0.5, y: 1 }}
                        centerOffset={{ x: 0, y: -25 }}
                        calloutEnabled={false}
                        onPress={() => markerSetup(location)}
                    >
                        <Image 
                            source={ require('../assets/images/aedMarker2.png')}
                            resizeMode='contain'
                            style={{height: 50, width: 35}}
                        />
                    </Marker>
                );
            })}

            {displayDirections ? (
                <MapViewDirections
                    origin={userLocation}
                    destination={destination}
                    apikey={GOOGLE_MAPS_APIKEY}
                    strokeWidth={6}
                    strokeColor="#018489"
                    onReady={onDirectionReady}
                    mode='WALKING'
                    resetOnChange = {false}
                />
            ) : null} 
        </MapView>
      
        <TouchableOpacity style={styles.closestAedButton} onPress={closestAED} >
            <Image 
                source={require('../assets/images/nearby.png')}
                resizeMode='contain'
                style={{height: '100%', width: '100%'}}
            />
        </TouchableOpacity>
       
        <TouchableOpacity style={styles.cprButton} onPress={cprAnimation}>
            <Animated.Image 
                source={ cprAnimationActive ? require('../assets/images/heartRed.png') : require('../assets/images/heartWhite.png')}
                resizeMode='contain'
                style={[{height: '100%', width: '100%'}, cprImageStyle]}
            />
        </TouchableOpacity>
    
        <PanGestureHandler onGestureEvent={onGestureEvent} >
            <Animated.View style={[styles.animatedView, animatedStyle]}>
            {!displayDirections ? (
                <Animated.View style={[styles.smallView, smallViewOpacityChange]}>  

                    <View style={styles.smallViewContainer}>
                        <View style={{flex: 1}}>
                            <Text style={styles.title}>{getName}</Text>
                            {getAddress.map((value, index) => (
                                    <Text key={index} style={styles.text}>{value}</Text>
                            ))}
                        </View>
                        <AEDImageContainer style={styles.aedSmall} onPress={toggleImageModal} base64Image={getImg} />
                    </View>
                    

                </Animated.View>
            ) : null }
                {fullOpenVisible ? (
                    <Animated.View style={[styles.destinationView, fullOpenViewOpacityChange]}>
                        <View style={styles.headerInfoContainer}>
                            <View style={styles.textContainerCentered}>
                                <Text style={styles.title}>Go right</Text>
                            </View>
                            <View style={styles.destinationImageContainer}>
                                <ImageInsideInfo imageBorderStyle={styles.destinationImageBorder}>
                                    <TouchableOpacity onPress={toggleImageModal}>
                                        <Image
                                                source={require('../assets/images/placeholder_aed.jpg')}
                                                resizeMode='cover'
                                                style={styles.allAvailableSpace}
                                            />
                                    </TouchableOpacity>
                                </ImageInsideInfo>
                            </View>
                        </View>
                    
                   </Animated.View>
                ) : null }
                {displayDirections ? (
                    <Animated.View style={[styles.directionView, directonViewOpacityChange]}>
                        <View style={styles.directionTopContainer}>
                            <View style={[styles.textContainer, { marginRight: 3}]}>
                                <Text style={styles.title}>{getName}</Text>
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.title}>{distance}</Text>
                            </View>
                        </View>
                         
                        <View style={styles.directionBottomContainer}>
                            <View style={[styles.imageContainer, {marginRight: 3}]}>
                                <AEDImageContainer style={styles.aedSmall} onPress={toggleImageModal} base64Image={getImg} />
                            </View>

                            <View style={styles.imageContainer}>
                                <Image 
                                    source={
                                        maneuver && maneuver.includes('left')
                                        ? require('../assets/images/turn_left.png')

                                        : maneuver && maneuver.includes('right') 
                                            ? require('../assets/images/turn_right.png')
                                            : require('../assets/images/straight_arrow.png')
                                    }
                                    resizeMode='contain'
                                    style={{height: '80%', width: '80%'}}
                                />
                            </View>
                        </View>
                        
                    </Animated.View>
                ) : null }
               
                <View style={styles.curvedIcon}/>
            </Animated.View>
        </PanGestureHandler>
        <Animated.View style={[styles.locateButtonContainer, locateButtonStyle]}>
            <LocateIcon style={styles.locateButton} onPress={startDirections}/>
        </Animated.View>
    </View>
    );
};

export default Home;
