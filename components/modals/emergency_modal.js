import React, { useState } from 'react';
import { StyleSheet, style, View, Button, Text, TouchableOpacity, Image} from "react-native";
import Modal from 'react-native-modal';

 EmergencyModal = () => {
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} >
                    <Image
                        source={require('../../assets/images/emergency.png')}
                        resizeMode='contain'
                        style={{height: '100%', width: '100%'}}
                    />
                </TouchableOpacity>
            <View style={styles.container}>
                <Modal
                    backdropOpacity={0.3}
                    isVisible={modalVisible}
                    onBackdropPress={() => setModalVisible(false)}
                    style={styles.contentView}
                >
                    <View style={styles.content}>
                        <Text style={styles.contentTitle}>Hi 👋!</Text>
                        <Text>Hello from Overlay!</Text>
                    </View>
                </Modal>
            </View>
        </View>
    );
    }

    const styles = StyleSheet.create({
        buttonContainer: {
            justifyContent: 'center',
            position: 'absolute',
            zIndex: 1,
            height: 90,
            width: 90,
            backgroundColor: 'red',
            borderColor: '#15202b',
            borderWidth: 4,
            borderRadius: 100,
            bottom: 25,
        },

        button: {
            height:'60%',
            marginBottom: 5
  
        },

        content: {
            backgroundColor: 'white',
            padding: 22,
            justifyContent: 'center',
            alignItems: 'center',
            borderTopRightRadius: 17,
            borderTopLeftRadius: 17,
        },
        contentTitle: {
            fontSize: 20,
            marginBottom: 12,
        },
        contentView: {
            justifyContent: 'flex-end',
            margin: 0,
        },
        buttonStyle: {
            height: 75,
            width: 75,
            backgroundColor: 'white',
            borderColor: 'red',
            borderWidth: 2,
            borderRadius: 100,
            marginBottom: 100,
        }
      });

export default EmergencyModal;