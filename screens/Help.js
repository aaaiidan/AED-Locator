import React, {useState} from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import ImageTextButton from '../components/touchables/image_text_button';
import styles from '../styles';

const screenHeight = Dimensions.get('window').height
const HelpScreen = ({navigation}) => {

    const [modalAEDVisible, setModalAEDVisible] = useState(false);

    return (
        <View style={styles.container}>
            <ScrollView>
                <ImageTextButton
                    image={require('../assets/images/map.png')}
                    text={'Home/Map'}
                    navigation={navigation}
                    screen={'HelpMap'}
                    imageStyle={styles.largeImage}
                />
                <ImageTextButton
                    image={require('../assets/images/pin.png')}
                    text={'Pins and AEDS'}
                    navigation={navigation}
                    screen={'HelpPins'}
                    imageStyle={styles.largeImage}
                />
                <ImageTextButton
                    image={require('../assets/images/emergency.png')}
                    text={'Emergency'}
                    navigation={navigation}
                    screen={'HelpEmergency'}
                    imageStyle={styles.largeImage}
                />
            </ScrollView>
        </View>
    
    );
};


export default HelpScreen;
