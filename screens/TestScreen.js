import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import AEDImageContainer from '../components/touchables/aed_image_container';
import LocateIcon from '../components/touchables/locate_icon';
import Animated, {  useSharedValue, useAnimatedStyle, withTiming, useAnimatedGestureHandler, interpolate, Extrapolate, runOnJS } from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';

// constant variables
const screenHeight = Dimensions.get('window').height
const screenWdidth = Dimensions.get('window').width
const placeholder_aed = require('../assets/images/placeholder_aed.jpg')
const image = Image.resolveAssetSource(placeholder_aed)
const closedY = 700
const smallOpenY = 520
const mediumOpenY = 175
const fullOpenY = 0
const TestScreen = ({navigation}) => {



    //Variables for gesture handling
    const translateY = useSharedValue(closedY); // Initial position below the screen
    const gestureState = useSharedValue(fullOpenY);
    const velocityFlag = useSharedValue(false);
  
    const [mediumVisible, setmediumVisible] = useState(true);

    //Variables for image modal
    const [isModalVisible, setModalVisible] = useState(false);
    const [ratio, setRatio] = useState(0);

    const [scrollEnabled, setScrollEnabled] = useState(false);
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

  //Function that starts animation of pop up
  const startAnimation = () => {
    translateY.value = withTiming(smallOpenY , {duration:750}); // Slide up to position 0
  };

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


  //Toggle enhanced image visibility
  const toggleImageModal = () => {
    setModalVisible(!isModalVisible)
  }

   //Adjust enhanced image height depending on width
  useEffect(() => {
    setRatio(screenWdidth/image.width)
  },[])

  return (
	<View style={styles.container}>
		<TouchableOpacity onPress={startAnimation}  style={{ backgroundColor: 'green'}}>
			<Text>Open</Text>
		</TouchableOpacity>
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
                            <Text style={styles.name}>John Anderson Building</Text>
                            <Text style={styles.text}>107 Rottenrow E</Text>
                            <Text style={styles.text}>Glasgow G4 0NG</Text>
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
        <Animated.View style={[{width: '100%', height: '17%', paddingBottom: '5%', paddingTop: '5%', flexDirection: 'row', justifyContent: 'center', backgroundColor: '#15202b'}, locateButtonStyle]}>
            <LocateIcon style={styles.locateButton}/>
        </Animated.View>
	</View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-end',
      backgroundColor: 'yellow',
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

export default TestScreen;
