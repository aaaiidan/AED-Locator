import React from 'react';
import { View, Text } from 'react-native';
import styles from '../../styles';

const ErrorModal = ({text}) => {

    return (
        <Modal 
        style={styles.modalImage}
        useNativeDriver={true}
        animationIn='fadeIn'
        animationOut='fadeOut'
        isVisible={isModalVisible}
        hideModalContentWhileAnimating
        onBackButtonPress={toggleImageModal}
        backdropOpacity={0.9}
    >
        <View>
            <Text>Error</Text>
            <Text>{text}</Text>
        </View>
        
    </Modal>
        
    );
};

export default ErrorModal;

