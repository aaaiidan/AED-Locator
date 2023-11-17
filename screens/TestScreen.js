import React, {useState} from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, SafeAreaView } from 'react-native';
import Modal from 'react-native-modal';
import DownArrowIcon from '../components/down_arrow';
import AEDImageContainer from '../components/aed_image_container';

const TestScreen = ({navigation}) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
      };
      return (
        
        <View style={styles.container}>
          <TouchableOpacity  onPress={toggleModal} style={{ backgroundColor: 'green'}}>
            <Text>Open</Text>
          </TouchableOpacity>
          <Modal isVisible={isModalVisible} style={styles.modal} backdropOpacity={0} swipeDirection={['up', 'down']} onSwipeComplete={() => setModalVisible(false)}>
            <View style={styles.modalView}>
              <DownArrowIcon style={styles.downArrow} onPress={toggleModal}/>
              <AEDImageContainer style={styles.aed} />
            </View>
          </Modal>
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
      flex:1,
      margin: 0,
      alignItems: 'center',
      justifyContent: 'flex-end',
    },

    modalView: {
      alignItems: 'center',
      justifyContent: 'flex-start',
      height: '75%',
      width: '110%',
      backgroundColor: '#15202b',
      borderTopRightRadius: '50%',
      borderTopLeftRadius: '50%',
    },

    downArrow: {
      width: '10%',
      height: '10%',
    },

    aed: {
      height: '25%',
      aspectRatio: 1,
      borderRadius: 100,
      overflow: 'hidden',
      borderColor: '#FFFFFF',
      borderWidth: 5
    }
   
});

export default TestScreen;
