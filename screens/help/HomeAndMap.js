import React, {useState} from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView, Image } from 'react-native';
import ImageTextButton from '../../components/touchables/image_text_button';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import HeaderWithInfo from '../../components/presentation/header_with_info';
//import externalStyle from '../style/externalStyle';

const screenHeight = Dimensions.get('window').height
const HomeAndMap = ({navigation}) => {

    return (
        <View style={styles.container}>
            <ScrollView style={styles.subContainer}>
                <HeaderWithInfo
                    title={'Home Screen'}
                    text={'When you are initially loaded into the app, you will be presented with the home screen. Within this screen is a \"Google Maps\" display with pins of every AED on the campus of \"The University of Strathclyde\". \n\nThe home screen is indicated by the map icon in the bottom left of the navbar. '}
                />
                <HeaderWithInfo 
                    title={'Map'}
                    text={'The map is the central hub of this app. Within in it, all of the AEDs are displayed as the following icons:\n\n\nAs well as these, there is a button located in the bottom right corner to locate the closest AED to you. This has the same functionality as pressing on any of the pins other than it will provide the information on the closest AED. \n\nWith permission, your location will also be displayed on the map. This is used for directions to any of the AEDs, as well as to inform you of your location.'}
                >
                    <View style={styles.imageInsideInfo}>
                        <View style={styles.imageContainer}>
                            <Image
                                source={require('../../assets/images/aedMarker.png')}
                                resizeMode='contain'
                                style={{ width: '100%', height: '100%',}}
                            />
                        </View>
                    </View>
                </HeaderWithInfo>
                <HeaderWithInfo 
                    title={'Nav Bar'}
                    text={'The nav bar, at the very bottom of the screen is used to navigate this app. The three main screens are: \n\n•Home/Map\n•Emergency\n•All AEDs'}
                >
                    <View style={styles.imageInsideInfo}>
                        <View style={styles.imageContainer}>
                            <Image
                                source={require('../../assets/images/map.png')}
                                resizeMode='contain'
                                style={{ width: '100%', height: '100%',}}
                            />
                        </View>
                        <View style={styles.imageContainer}>
                            <Image
                                source={require('../../assets/images/emergency.png')}
                                resizeMode='contain'
                                style={{ width: '100%', height: '100%',  }}
                            />
                        </View>
                        <View style={styles.imageContainer}>
                            <Image
                                source={require('../../assets/images/pin.png')}
                                resizeMode='contain'
                                style={{ width: '100%', height: '100%',  }}
                            />
                        </View>
                    </View>
                </HeaderWithInfo>
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
subContainer: {
    flex: 1,
},

mediumFullInfoContainer: {
    flexDirection: 'column',
    width: '100%',
    marginBottom: '3%',
},

textContainer:{
    justifyContent: 'center',
},


name:{
    textAlign:'left',
    color: '#FFFFFF',
    fontSize: RFValue(14),
    fontWeight: 'bold',
    marginBottom: '2%',
    flexShrink: 1
},

subContainer3: {
    minHeight: 25,
    flexDirection: 'row',
    backgroundColor: '#192734',
    marginBottom: 3,
    paddingLeft: 5,
},

imageInsideInfo: {
    flex: 1,
    justifyContent: 'center',
    flexDirection:'row',
    flexWrap: 'wrap',
},

imageContainer: {
    width: '30%',
    height: screenHeight/5,
    padding: '2%',
    backgroundColor: '#1f3141',
    margin: '1%',
    justifyContent: 'center',
}

});

export default HomeAndMap;
