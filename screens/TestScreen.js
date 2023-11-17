import React, {useState} from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, SafeAreaView } from 'react-native';
import Modal from 'react-native-modal';
import DownArrowIcon from '../components/down_arrow';
import AEDImageContainer from '../components/aed_image_container';
import LocateIcon from '../components/locate_icon';

  
const screenHeight = Dimensions.get('window').height


const TestScreen = ({navigation}) => {
  //Placeholders
  const address = 'John Anderson Building \n 107 Rottenrow E \n Glasgow G4 0NG'
  const days = 'Monday \n Tuesday \n Wednesday \n Thursday \n Friday \n Saturday \n Sunday'
  const openingTimes = '9:00 - 17:00 \n 9:00 - 17:00 \n 9:00 - 17:00 \n 9:00 - 17:00 \n 9:00 - 17:00 \n 9:00 - 17:00 \n 9:00 - 17:00'

  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };

  return (
    <View style={styles.container}>
      <TouchableOpacity  onPress={toggleModal} style={{ backgroundColor: 'green'}}>
        <Text>Open</Text>
      </TouchableOpacity>
      <Modal isVisible={isModalVisible} style={styles.modal} backdropOpacity={0} swipeDirection={ 'down'} onSwipeComplete={() => setModalVisible(false)}>
        <View style={styles.modalView}>
          <DownArrowIcon style={styles.downArrow} onPress={toggleModal}/>
          <AEDImageContainer style={styles.aed} />
          <View style={styles.infoContainer}>
            <Text style={styles.address}> {address}</Text>
            <View style={styles.openingTimesContainer}>
              <Text style={styles.days}> {days}</Text>
              <Text style={styles.times}> {openingTimes}</Text>
            </View>
            <LocateIcon style={styles.locateButton}/>
          </View>
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
      margin: 0,
      alignItems: 'center',
      justifyContent: 'flex-end',
    },

    modalView: {
      alignItems: 'center',
      justifyContent: 'flex-start',
      height: '80%',
      width: '100%',
      backgroundColor: '#15202b',
      borderTopRightRadius: '50%',
      borderTopLeftRadius: '50%',
      paddingLeft: (screenHeight * 0.025),
      paddingRight: (screenHeight * 0.025),
      paddingBottom: (screenHeight * 0.025),
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
    }
   
});

export default TestScreen;
