import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import Modal from 'react-native-modal';
import DownArrowIcon from '../components/down_arrow';
import AEDImageContainer from '../components/aed_image_container';
import LocateIcon from '../components/locate_icon';
import Animated, {  useSharedValue, useAnimatedStyle, withTiming, useAnimatedGestureHandler } from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
  
const screenHeight = Dimensions.get('window').height
const screenWdidth = Dimensions.get('window').width
const intialY = 700
const maxY = 0

const placeholder_aed = require('../assets/images/placeholder_aed.jpg')
const image = Image.resolveAssetSource(placeholder_aed)

const TestScreen = ({navigation}) => {

  //Variables for gesture handling
  const translateY = useSharedValue(intialY); // Initial position below the screen
  const gestureState = useSharedValue(maxY);

  //Variables for image modal
  const [isModalVisible, setModalVisible] = useState(false);
  const [ratio, setRatio] = useState(0);

	const onGestureEvent = useAnimatedGestureHandler({
		onStart: (_, ctx) => {
		  	ctx.startY = translateY.value; // ctx is object that stores phases of gesture (y value)
		  	gestureState.value = 1; // Gesture is active 
		},
		onActive: (event, ctx) => {
		  	const currentY = ctx.startY + event.translationY;
			translateY.value = Math.min(550, Math.max(0, currentY));

			if (event.velocityY > 1000) {
				translateY.value = withTiming(intialY); // Example: Snap to maxY if the swipe velocity is high
			} else if ( translateY.value < 350) {
				translateY.value = withTiming(maxY);
			} else if (translateY.value > 350) {
				translateY.value = withTiming(intialY);
			}
			
		},
		onEnd: () => {
		  	gestureState.value = 0; // Gesture is inactive 

		},
	  });

  const startAnimation = () => {
    translateY.value = withTiming(0); // Slide up to position 0
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });


  const toggleImageModal = () => {
    setModalVisible(!isModalVisible)
  }

  useEffect(() => {
    setRatio(screenWdidth/image.width)
  },[])

  //Placeholders
  const address = 'John Anderson Building \n 107 Rottenrow E \n Glasgow G4 0NG'
  const days = 'Monday \n Tuesday \n Wednesday \n Thursday \n Friday \n Saturday \n Sunday'
  const openingTimes = '9:00 - 17:00 \n 9:00 - 17:00 \n 9:00 - 17:00 \n 9:00 - 17:00 \n 9:00 - 17:00 \n 9:00 - 17:00 \n 9:00 - 17:00'



  return (
	<View style={styles.container}>
		<TouchableOpacity onPress={startAnimation}  style={{ backgroundColor: 'green'}}>
			<Text>Open</Text>
		</TouchableOpacity>
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
				<DownArrowIcon style={styles.downArrow}/>
				<AEDImageContainer style={styles.aed} onPress={toggleImageModal} />
				<View style={styles.infoContainer}>
				  <Text style={styles.address}> {address}</Text>
          <View style={styles.openingTimesContainer}>
            <Text style={styles.days}> {days}</Text>
            <Text style={styles.times}> {openingTimes}</Text>
          </View>
				  <LocateIcon style={styles.locateButton}/>
				</View>
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
      textAlign:'right',
      color: '#FFFFFF',
      fontSize: 20,
    },

    modalImage: {
      margin: 0,
      alignItems: 'center',
      justifyContent: 'center',
    },
   
});

export default TestScreen;
