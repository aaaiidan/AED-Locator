import React, {useState} from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView, Image} from 'react-native';
import ImageTextButton from '../../components/touchables/image_text_button';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import HeaderWithInfo from '../../components/presentation/header_with_info';
import styles from '../../styles';
import ImageInsideInfo from '../../components/presentation/image_inside_info';

const screenHeight = Dimensions.get('window').height
const PinsAndAEDs = ({navigation}) => {

    return (
        <View style={styles.container}>
            <ScrollView>
                <HeaderWithInfo title={'Pins'} >

                    <Text style={styles.helpText}>On the map there are green pins representing each location of the Automated External Defribrillators (AEDS). Each pin, when pressed, provides information about the AED and its location. The information provided is as follows:</Text>
                    <Text style={styles.text}>1. Name</Text>
                    <Text style={styles.text}>2. Address</Text>
                    <Text style={styles.text}>3. Floor</Text>
                    <Text style={styles.text}>4. Opening Times</Text>
                    <Text style={styles.text}>5. Description</Text>
                    <Text style={styles.helpText}>6. Brand</Text>
                    <Text style={styles.helpText}>Directions to each AED are accessed, simply, by pressing on the directions button underneath the key information.</Text>

                    <ImageInsideInfo>
                            <Image
                                source={require('../../assets/images/locate.png')}
                                resizeMode='contain'
                                style={styles.allAvailableSpace}
                            />
                    </ImageInsideInfo>
                </HeaderWithInfo>

                <HeaderWithInfo title={'Directions'}>
                    <Text style={styles.helpText}>The aim of this application is to quickly and efficiently guide you, the user, to the nearest (or any) AED in case of an emergency.</Text>
                    <Text style={styles.helpText}>Once directions have been activated, a line betweeen your location and the AED will be displayed, alongside the direction and distance to follow. To cancel the directions, swipe up or down on the pop-up.</Text>
                </HeaderWithInfo>
                
            </ScrollView>
        </View>
        
    );
};

export default PinsAndAEDs;
