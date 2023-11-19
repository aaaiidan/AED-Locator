import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, SafeAreaView, Image, ImageResolvedAssetSource } from 'react-native';
import Modal from 'react-native-modal';
  
const screenWdidth = Dimensions.get('window').width
const placeholder_aed = require('../../assets/images/placeholder_aed.jpg')
const image = Image.resolveAssetSource(placeholder_aed)

const ImageModal = ({navigation, visibility, ImageModalVisibility, toggleParentModal}) => {
 
  const [isModalVisible, setModalVisible] = useState(false);
  const [ratio, setRatio] = useState(0);

    const handleImageVisibility = () => {
        ImageModalVisibility()
    }

    const toggleParentModalVisibility = () => {
        toggleParentModal()
    }

    useEffect(() => {
      setRatio(screenWdidth/image.width)
    },[])

    useEffect(() => {
       setModalVisible(visibility)
      },[visibility])


  return (
  
    <Modal 
        style={styles.modal}
        useNativeDriver={true}
        animationIn='fadeIn'
        animationOut='fadeOut'
        isVisible={isModalVisible}
        hideModalContentWhileAnimating
        onBackButtonPress={handleImageVisibility}
        onBackdropPress={handleImageVisibility}
        onModalHide={toggleParentModalVisibility}
        backdropOpacity={0.9}
        >
        <Image 
            source={placeholder_aed}
            resizeMode='contain'
            style={{ width: '100%', height: image.height * ratio}}
        />
    </Modal>
    
  );
};

const styles = StyleSheet.create({
    modal: {
      margin: 0,
      alignItems: 'center',
      justifyContent: 'center',
    },
});

export default ImageModal;
