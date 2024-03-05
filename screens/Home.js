import React, {useEffect, useRef, useState} from 'react';
import { View, TouchableOpacity , Text, Image, Dimensions, Alert } from 'react-native';
import { ScrollView as ReactScrollView } from 'react-native';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';
import Modal from 'react-native-modal';
import AEDImageContainer from '../components/touchables/aed_image_container';
import Animated, {  useSharedValue, useAnimatedStyle, withTiming, useAnimatedGestureHandler, interpolate, Extrapolate, runOnJS, withRepeat, withSequence } from 'react-native-reanimated';
import { PanGestureHandler, ScrollView } from 'react-native-gesture-handler';
import MapViewDirections from 'react-native-maps-directions';
import * as Location from 'expo-location';
import LocateIcon from '../components/touchables/locate_icon';
import haversine from 'haversine';
import HeaderWithInfo from '../components/presentation/header_with_info';
import { useData } from '../DataContext';
import styles from '../styles';
import ImageInsideInfo from '../components/presentation/image_inside_info';
import Unavailable from '../components/presentation/unavailable';


const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const placeholder_aed = require('../assets/images/placeholder_aed.png');
const image = Image.resolveAssetSource(placeholder_aed);
const addressOrder = ['AddressLine1', 'AddressLine2', 'City', 'Postcode']
const openingTimesOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const Home = ({navigation, route}) => {
    const [containerHeight, setContainerHeight] = useState(screenHeight);
    const [directionContainerWidth, setDirectionContainerWidth] = useState(screenWidth);

    const onContainerLayout = (event) => {
        const { height } = event.nativeEvent.layout;
        setContainerHeight(height);
        console.log(containerHeight);
    }

    const onDestinationViewLayout = (event) => {
        const { width } = event.nativeEvent.layout;
        setDirectionContainerWidth(width - (styles.destinationView.paddingRight * 2));
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
    const [modalVisible, setModalVisible] = useState(false);

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

             // if overlay < 80% from the top of container, fullOpenVisble = false and atDestination = false
             if(translateY.value < smallOpenY && !fullOpenVisible && !atDestination){
                runOnJS(setFullOpenVisible)(true)
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

                } else if(atDestination){
                    if(translateY.value < (30/100) * containerHeight){
                        translateY.value = withTiming(fullOpenY);

                    } else {
                        translateY.value = withTiming(closedY);
                        runOnJS(setAtDestination)(false)
                    }

                } else {
                    if(translateY.value > (85/100) * containerHeight){
                        //Overlay is in the bottom 15% of the container
                        translateY.value = withTiming(closedY);
                        runOnJS(setFullOpenVisible)(false)

                    } else if(translateY.value >= (75/100) * containerHeight && translateY.value < (85/100) * containerHeight){
                        //Overlay is between the bottom 15% and 25% of the container
                        translateY.value = withTiming(smallOpenY);
                        runOnJS(setFullOpenVisible)(false)

                    } else if (translateY.value < (75/100) * containerHeight && isPositive){ //less than 75% && postive
                        //Overlay is above the bottom 25% of the container & the swipe direction is positive
                        translateY.value = withTiming(fullOpenY);

                    } else if (translateY.value > (30/100) * containerHeight && !isPositive){ //less than 30% && negative direction
                        //Overlay is above the bottom 70% of the container & the swipe direction is negative
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
        setFullOpenVisible(false);
        setDisplayDirections(false);
        translateY.value = withTiming(fullOpenY);
        setAtDestination(true);
        
    }

    //Starts animation of overlay
    const startAnimation = () => {
        translateY.value = withTiming(smallOpenY , {duration:750}); // Slide up to position smallOpenY
    };

    //Toggle enhanced image visibility
    const toggleImageModal = () => {
        setModalVisible(!modalVisible)
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
        const yValue = !atDestination && !displayDirections ? interpolate(translateY.value, [(750/ 812) * screenHeight, (175/ 812) * screenHeight], [600, 0], Extrapolate.CLAMP) : 600;
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
        translateY.value = withTiming(directionOpenY , {duration:750}); // Slide down to position directionOpenY
        markerRegion( {latitude: 55.8621133244897, longitude: -4.2423899331605615 }, {latitudeDelta: 0.01, longitudeDelta: 0.005}, 2000);

        if(userLocation){
            setTimeout(() => {
                markerRegion(userLocation, {latitudeDelta: 0.01, longitudeDelta: 0.005,}, 2000); 
            }, 2500); 
          
        }
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
                    withTiming(1.2, { duration: 272.5 }),
                    withTiming(1, { duration:  272.5 })
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


    const horizontalScrollViewRef = useRef();
    const [currentOffsetX, setCurrentOffsetX] = useState(0);

    const scrollToNextItem = () => {
        const newXOffset = currentOffsetX + directionContainerWidth;
        horizontalScrollViewRef.current.scrollTo({ x: newXOffset, animated: true });
        
    };

    const scrollToPreviousItem = () => {
        const newXOffset = Math.max(0, currentOffsetX - directionContainerWidth); // Prevent scrolling beyond the start
        horizontalScrollViewRef.current.scrollTo({ x: newXOffset, animated: true });
    };

    const handleScroll = (event) => {
        setCurrentOffsetX(event.nativeEvent.contentOffset.x);
    };

    // ==========================================
    // =            Handling data               =
    // ==========================================
    const{ locations, aeds, coverImagesBase64, indoorImagesBase64, cprSoundActivated, setCprSoundActivated } = useData();

    const [getAddress, setAddress] = useState([]);
    const [getName, setName] = useState('Unavailable');
    const [getOpeningTimes, setOpeningTimes] = useState([]);

    const [getBrand, setBrand] = useState('-');
    const [getDesc, setDesc] = useState('-');
    const [getFloor, setFloor] = useState('-');
    const [getImg, setImg] = useState(null);
    const [getIndoorDirections, setIndoorDirections] = useState([]);

    const [getID, setID] = useState(null)

    const [distance, setDistance] = useState(null);
    const [maneuver, setManeuver] = useState(null);

   

    const formatData = (location) => {
        setAddress(addressOrder.map(key => location.Address[key]).filter(Boolean))

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
        setDestination(location.Name + ', ' + (addressOrder.map(key => location.Address[key])).join(', '));

        if(aeds){
            aeds.some(aed => {
                if(aed.LocationRef.id == location.id){
                    console.log('111111111111111', aed.LocationRef);
                    setID(aed.id ?? null)
                    setBrand(aed.Brand != null ? aed.Brand : '-');
                    setDesc(aed.Description != null ? aed.Description : '-');
                    setFloor(aed.FloorLevel != null ? 'Level ' + aed.FloorLevel : '-');
                    setIndoorDirections(aed.IndoorDirections ?? []);
                    setImg(aed.id in coverImagesBase64 ? coverImagesBase64[aed.id] : null);
                }
            });
        }
       
       console.log(getIndoorDirections);
    }

    const markerSetup = (location) => {

        setDisplayDirections(false);
        markerRegion(location.Coordinates, {latitudeDelta:0.002, longitudeDelta: 0.002}, 1000);
        formatData(location);
        startAnimation();

    }


    useEffect(() => {
        setCprAnimationActive(cprSoundActivated);
    },[]);

    const [modalImageHeight ,setModalImageHeight] = useState(0);

    useEffect(() => {
        if(getImg){
            Image.getSize(getImg, (width, height) => {
                setModalImageHeight((height/width)* screenWidth); //Adjust enhanced image height depending on width
            })
        } else {
            Image.getSize(image.uri, (width, height) => {
                setModalImageHeight((height/width)* screenWidth); //Adjust enhanced image height depending on width
            })
        }
    },[getImg]);

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
        if( result.legs && result.legs.length > 0 ){
            if(result.legs[0].distance.value < 50){
                onDestination();
            } else {
                const steps = result.legs[0].steps ? result.legs[0].steps : [] ;
                setDistance(steps[0]?.distance?.text ?? null);
                setManeuver(steps[1]?.maneuver ?? null);
            }
        }
    }
         

    const startDirections = () => {
            setDisplayDirections(true);
            directionViewChange();
    };

    const closestAED = () => {
        if(locations && aeds && userLocation){
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
        } else {
            Alert.alert('Error', 'Unable to load nearest AED', [
                {text: 'OK'},
              ]);
        }
        
    }

    return (
    <View style={styles.homeContainer} onLayout={onContainerLayout}>
        <Modal 
            style={styles.modalImage}
            useNativeDriver={true}
            animationIn='fadeIn'
            animationOut='fadeOut'
            isVisible={modalVisible}
            hideModalContentWhileAnimating
            onBackButtonPress={toggleImageModal}
            onBackdropPress={toggleImageModal}
            backdropOpacity={0.9}
        >
            <Image 
                source={getImg ? { uri: getImg } : placeholder_aed}
                resizeMode='contain'
                style={{ width: '100%', height: modalImageHeight}}
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

            {displayDirections && userLocation && destination ? (
                <MapViewDirections
                    origin={userLocation}
                    destination={destination}
                    apikey={GOOGLE_MAPS_APIKEY}
                    strokeWidth={6}
                    strokeColor="#018489"
                    onReady={onDirectionReady}
                    mode='BICYCLING'
                    resetOnChange={false}
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
    
        <PanGestureHandler onGestureEvent={onGestureEvent} waitFor='informationScrollView'>
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
                    <Animated.View style={[styles.fullOpenView, fullOpenViewOpacityChange]}>
                    <AEDImageContainer style={styles.aedFull} onPress={toggleImageModal} base64Image={getImg} />
                    <ScrollView style={styles.informationScrollView} scrollEventThrottle={16} scrollEnabled={true} nestedScrollEnabled={true} nativeID='informationScrollView'>

                        <HeaderWithInfo title={'Name'}>
                            <Text style={styles.text}>{getName}</Text>
     
                        </HeaderWithInfo>
                       
                        <HeaderWithInfo title={'Address'} split={true}>
                            <> 
                                <Text style={styles.subTitle}>Address</Text>
                                <Text style={styles.text}>{getName}</Text>
                                {getAddress.map((value, index) => (
                                    <Text key={index} style={styles.text}>{value}</Text>
                                ))}
                            </>
                            <> 
                                <Text style={styles.subTitle}>Floor</Text>
                                <Text style={styles.text}>{getFloor}</Text>
                            </>
                        </HeaderWithInfo>

                        <HeaderWithInfo title={'Opening Times'} split={true}>
                            <> 
                                <Text style={styles.subTitle}>Day</Text>
                                {openingTimesOrder.map((value, index) => (
                                    <Text key={index} style={styles.text}>{value}</Text>
                                ))}
                            </>
                            <> 
                                <Text style={styles.title}></Text>
                                {getOpeningTimes.map((value, index) => (
                                    <Text key={index} style={styles.text}>{value}</Text>
                                ))}
                            </>
                        </HeaderWithInfo>

                        <HeaderWithInfo title={'Description'}>
                            <Text style={styles.text}>{getDesc}</Text>
                        </HeaderWithInfo>

                        <HeaderWithInfo title={'Brand'}>
                            <Text style={styles.text}>{getBrand}</Text>
                        </HeaderWithInfo>

                    </ScrollView>
               </Animated.View>
                   
                ) : null }

                {displayDirections ? (
                    <Animated.View style={[styles.directionView, directonViewOpacityChange]}>
                        {userLocation && destination ?(
                            <>
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
                            </>

                        ) : (
                            <Unavailable text={'Error accessing directions'}/>
                        )}

                        
                    </Animated.View>
                ) : null }
                {atDestination ? (
                   <Animated.View style={[styles.destinationView, fullOpenViewOpacityChange]} onLayout={onDestinationViewLayout}>
                        <ScrollView  horizontal pagingEnabled ref={horizontalScrollViewRef} onScroll={handleScroll} scrollEventThrottle={16} style={{flex:1}}>
                   
                    {getIndoorDirections.length > 0 ? getIndoorDirections.map((direction, index) => (
                        <>
                            <View key={index} style={[styles.headerInfoContainer, {width: directionContainerWidth}]}>

                                {getIndoorDirections.length-1 == index ? (
                                        <View style={styles.textContainerCentered}>
                                            <Text style={styles.title}>{direction ?? 'Unavailable'}</Text>
                                        </View>
                                    ) : (
                                        <View style={styles.textContainerCentered}>
                                            <Text style={styles.title}>{direction.Text ?? 'Unavailable'}</Text>
                                        </View>
                                )}

                                <View style={styles.destinationImageContainer}>
                                    
                                    {Object.keys(indoorImagesBase64) !=0  && indoorImagesBase64[getID][index]? 
                                    (
                                        <ImageInsideInfo imageBorderStyle={styles.destinationImageBorder}>
                                            <Image
                                                source={{uri: indoorImagesBase64[getID][index]}}
                                                resizeMode='cover'
                                                style={[styles.allAvailableSpace, {borderColor: 'white', borderWidth: 2}]}
                                            />
                                        </ImageInsideInfo>
                                    ) : getIndoorDirections.length-1 == index ? 
                                        (
                                            <ImageInsideInfo imageBorderStyle={styles.destinationImageBorder}>
                                                <Image
                                                    source={getImg ? { uri: getImg } : placeholder_aed}
                                                    resizeMode='cover'
                                                    style={[styles.allAvailableSpace, {borderColor: 'white', borderWidth: 2}]}
                                                />
                                        </ImageInsideInfo>
                                        ):(
                                            <Text style={styles.title}>Image Unavailable</Text>
                                    )}
                                </View>
                            </View>
                        </>
                    )) : (
                        <Unavailable text={'Error loading information'}/>
                    )}
                    </ScrollView>
                            <TouchableOpacity style={styles.arrowRight} onPress={scrollToNextItem}>
                                <Image
                                    source={require('../assets/images/arrow.png')}
                                    resizeMode='contain'
                                    style={styles.allAvailableSpace}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.arrowLeft} onPress={scrollToPreviousItem}>
                                <Image
                                    source={require('../assets/images/arrow.png')}
                                    resizeMode='contain'
                                    style={styles.allAvailableSpace}
                                />
                            </TouchableOpacity>
                </Animated.View>
                ) : null
                }
               
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
