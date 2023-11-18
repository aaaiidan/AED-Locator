import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, SafeAreaView, Image, ImageResolvedAssetSource } from 'react-native';
import Modal from 'react-native-modal';
  
const screenWdidth = Dimensions.get('window').width
const placeholder_aed = require('../../assets/images/placeholder_aed.jpg')

const image = Image.resolveAssetSource(placeholder_aed)


const ImageModal = ({navigation}) => {
 
  const [isModalVisible, setModalVisible] = useState(false);
  const [imageDimenstions, setImageDimensions] = useState({width: 0, height: 0})
  const [ratio, setRatio] = useState(0);

  const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };

    useEffect(() => {
      console.log(image.height)
      console.log(image.width)
      setRatio(screenWdidth/image.width)
    },[])


  return (
    <View style={styles.container}>
        <TouchableOpacity  onPress={toggleModal} style={{ backgroundColor: 'green'}}>
            <Text>Open</Text>
        </TouchableOpacity>
        <SafeAreaView>
        <Modal 
          style={styles.modal}
          useNativeDriver={true}
          animationIn='fadeIn'
          animationOut='fadeOut'
          isVisible={isModalVisible}
          hideModalContentWhileAnimating
          onSwipeComplete={toggleModal}
          swipeDirection='down'
          onBackButtonPress={toggleModal}
          onBackdropPress={toggleModal}>  
            <Image 
              source={placeholder_aed}
              resizeMode='contain'
              style={{ width: '100%', height: image.height * ratio}}
            />
        </Modal>
        </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'yellow',
    },

    modal: {
      margin: 0,
      alignItems: 'center',
      justifyContent: 'center',
    },

    

   
});

export default ImageModal;
