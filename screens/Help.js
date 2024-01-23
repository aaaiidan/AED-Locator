import React, {useState} from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import ImageTextButton from '../components/touchables/image_text_button';
//import externalStyle from '../style/externalStyle';

const screenHeight = Dimensions.get('window').height
const HelpScreen = ({navigation}) => {

const [modalAEDVisible, setModalAEDVisible] = useState(false);

return (
    <View style={styles.container}>
        <View style={styles.subContainer}>
            <ImageTextButton
                image={require('../assets/images/pin.png')}
                text={'Pins and AEDS'}
                navigation={navigation}
                screen={'HelpPins'}
            />
            <ImageTextButton
                image={require('../assets/images/map.png')}
                text={'Home/Map'}
                navigation={navigation}
                screen={'HelpMap'}
            />
            <ImageTextButton
                image={require('../assets/images/cpr.png')}
                text={'CPR'}
            />
            <ImageTextButton
                image={require('../assets/images/emergency.png')}
                text={'Emergency'}
            />
        </View>
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
subContainer: {
    flex: 1,
    justifyContent:'flex-start',
    
},

});

export default HelpScreen;
