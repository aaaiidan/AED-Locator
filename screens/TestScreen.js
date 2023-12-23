import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import Modal from 'react-native-modal';
import DownArrowIcon from '../components/down_arrow';
import AEDImageContainer from '../components/aed_image_container';
import LocateIcon from '../components/locate_icon';
import Animated, {  useSharedValue, useAnimatedStyle, withTiming, useAnimatedGestureHandler, interpolate, Extrapolate, runOnJS } from 'react-native-reanimated';
import { PanGestureHandler, ScrollView } from 'react-native-gesture-handler';

// constant variables
const screenHeight = Dimensions.get('window').height
const screenWdidth = Dimensions.get('window').width
const placeholder_aed = require('../assets/images/placeholder_aed.jpg')
const image = Image.resolveAssetSource(placeholder_aed)
const closedY = 700
const smallOpenY = 515
const mediumOpenY = 150
const fullOpenY = 0

//Placeholders
const address = 'John Anderson Building \n 107 Rottenrow E \n Glasgow G4 0NG'
const days = 'Monday \n Tuesday \n Wednesday \n Thursday \n Friday \n Saturday \n Sunday'
const openingTimes = '9:00 - 17:00 \n 9:00 - 17:00 \n 9:00 - 17:00 \n 9:00 - 17:00 \n 9:00 - 17:00 \n 9:00 - 17:00 \n 9:00 - 17:00'

const TestScreen = ({navigation}) => {



  //Variables for gesture handling
  const translateY = useSharedValue(closedY); // Initial position below the screen
  const gestureState = useSharedValue(fullOpenY);
  const velocityFlag = useSharedValue(false);
  
    const [mediumVisible, setmediumVisible] = useState(true);

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
			translateY.value = Math.min(700, Math.max(0, currentY));
            if(translateY.value < 450 && mediumVisible == false){
                console.log('visible')
                runOnJS(setmediumVisible)(true)
            } else if ( translateY.value > 450 && mediumVisible == true){
                runOnJS(setmediumVisible)(false)
                console.log('hidden')
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
                if ( translateY.value < 450 && translateY.value > mediumOpenY - 50) { 
                    translateY.value = withTiming(mediumOpenY);
                } else if ( translateY.value > 450 && translateY.value < smallOpenY){
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
    translateY.value = withTiming(515 , {duration:750}); // Slide up to position 0
  };

  //Function that changes the y position of pop up depending on users swipe
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });


    const smallViewOpacityChange = useAnimatedStyle(() => {
        const opacity = interpolate(translateY.value, [450, 350], [1, 0], Extrapolate.CLAMP);
        return {
        opacity,
        };
    });

    const mediumViewOpacityChange = useAnimatedStyle(() => {
        const opacity = interpolate(translateY.value, [350, 250], [0, 1], Extrapolate.CLAMP);
        return {
        opacity,
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
                            <View style={styles.textContainer}>
                                <Text style={styles.name}>John Anderson Building</Text>
                                <Text style={styles.text}>107 Rottenrow E</Text>
                                <Text style={styles.text}>Glasgow</Text>
                                <Text style={styles.text}>G4 0NG</Text>
                            </View>
                            <AEDImageContainer style={styles.aedSmall} onPress={toggleImageModal} />
                        </View>
                    </Animated.View>
                {mediumVisible ? (
                   <Animated.View style={[styles.mediumView, mediumViewOpacityChange]}>
                        <AEDImageContainer style={styles.aedMedium} onPress={toggleImageModal} />
                        <Text style={styles.name}>John Anderson Building</Text>
                        <Text style={styles.text}>107 Rottenrow E</Text>
                        <Text style={styles.text}>Glasgow</Text>
                        <Text style={styles.text}>G4 0NG</Text>
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
        backgroundColor: 'green',
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
        fontSize: 18,
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
        position: 'absolute',
      },
   
});

export default TestScreen;
