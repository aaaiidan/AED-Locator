import React, {useState} from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, SafeAreaView } from 'react-native';

import Modal from 'react-native-modal';

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
          <Modal isVisible={isModalVisible} style={styles.modal} backdropOpacity={0}>
            <View style={styles.modalView}>
                <TouchableOpacity  onPress={toggleModal} style={{ backgroundColor: 'green'}}>
                    <Text>Close</Text>
                </TouchableOpacity>
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
        justifyContent: 'center',
        height: '75%',
        width: '100%',
        backgroundColor: '#15202b',
    }
   
});

export default TestScreen;
