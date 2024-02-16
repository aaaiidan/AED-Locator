import React from 'react';
import { View, Text, Dimensions, ScrollView, Image } from 'react-native';
import HeaderWithInfo from '../../components/presentation/header_with_info';
import ImageInsideInfo from '../../components/presentation/image_inside_info';
import styles from '../../styles';

const HomeAndMap = ({navigation}) => {

    return (
        <View style={styles.container}>
            <ScrollView>
                <HeaderWithInfo title={'Home Screen'}>
                    <Text style={styles.helpText}>When you are initially loaded into the app, you will be presented with the home screen. Within this screen is a "Google Maps" display with pins of every AED on the campus of "The University of Strathclyde".</Text>
                    <Text style={styles.helpText}>The home screen is indicated by the map icon in the bottom left of the navbar:</Text>
                        <ImageInsideInfo>
                            <Image
                                source={require('../../assets/images/active_map.png')}
                                resizeMode='contain'
                                style={styles.allAvailableSpace}
                            />
                        </ImageInsideInfo>
                </HeaderWithInfo>

                <HeaderWithInfo  title={'Map'}>
                    <Text style={styles.helpText}>The map is the central hub of this app. Within in it, all of the AEDs are displayed as the following icons:</Text>
                        <ImageInsideInfo>
                            <Image
                                source={require('../../assets/images/aedMarker.png')}
                                resizeMode='contain'
                                style={styles.allAvailableSpace}
                            />
                        </ImageInsideInfo>
                    <Text style={styles.helpText}>As well as these, there is a button located in the bottom right corner to locate the closest AED to you. This has the same functionality as pressing on any of the pins other than it will provide the information on the closest AED.</Text>
                    <Text style={styles.helpText}>With permission, your location will also be displayed on the map. This is used for directions to any of the AEDs, as well as to inform you of your location.</Text>
                </HeaderWithInfo>

                <HeaderWithInfo title={'Nav Bar'}>
                    <Text style={styles.helpText}>The nav bar, at the very bottom of the screen is used to navigate this app. The three main screens are:</Text>
                    <Text style={styles.text}>•Home/Map</Text>
                    <Text style={styles.text}>•Emergency</Text>
                    <Text style={styles.helpText}>•All AEDs</Text>

                     <ImageInsideInfo>
                        <Image
                            source={require('../../assets/images/map.png')}
                            resizeMode='contain'
                            style={styles.allAvailableSpace}
                        />
                        <Image
                            source={require('../../assets/images/emergency.png')}
                            resizeMode='contain'
                            style={styles.allAvailableSpace}
                        />
                        <Image
                            source={require('../../assets/images/pin.png')}
                            resizeMode='contain'
                            style={styles.allAvailableSpace}
                        />
                    </ImageInsideInfo>
                </HeaderWithInfo>
            </ScrollView>
        </View>
        
    );
};

export default HomeAndMap;
