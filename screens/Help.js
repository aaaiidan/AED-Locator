import React, {useState} from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import ImageTextButton from '../components/touchables/image_text_button';
//import externalStyle from '../style/externalStyle';

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
            />
            <ImageTextButton
                image={require('../assets/images/pin.png')}
                text={'Pins and AEDS'}
                navigation={navigation}
                screen={'HelpPins'}
            />
            <ImageTextButton
                image={require('../assets/images/emergency.png')}
                text={'Emergency'}
                navigation={navigation}
                screen={'HelpEmergency'}
            />
        </ScrollView>
    </View>
    
);
};

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#15202b',
    paddingLeft: (screenHeight * 0.025),
    paddingRight: (screenHeight * 0.025),
    paddingTop: (screenHeight * 0.025) ,
    paddingBottom: (screenHeight * 0.025),
},

});

export default HelpScreen;
