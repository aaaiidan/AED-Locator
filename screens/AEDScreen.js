import React, { useState} from 'react';
import { View, Image, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import PinIcon from '../components/touchables/pin';
import ImageTextButton from '../components/touchables/image_text_button';
//import externalStyle from '../style/externalStyle';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { useData } from '../DataContext';


const screenHeight = Dimensions.get('window').height


const AEDScreen = ({navigation}) => {

    const{ locations, aeds } = useData();

    return (
        <View style={styles.container}>
            <ScrollView >
                {locations.map((location) => {
                    let img = null;
                    aeds.map((aed) => {
                        if(aed.LocationRef.id == location.id){
                            img = aed.Image != null ? aed.Image : require('../assets/images/placeholder_aed.png')
                        }
                    });
                    return(
                        <ImageTextButton image={img} imageStyle={styles.imageStyle} text={location.Name} textStyle={styles.text} navigation={navigation} screen={'Map'} action={location}/>
                    )
                })}
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
    
    imageStyle: {
        width: '100%',
        height: '100%',
        overflow: 'hidden',
    },

    text:{
        flex: 1,
        textAlign:'right',
        color: '#FFFFFF',
        fontSize: RFValue(24),
        fontWeight: 'bold',
      
    },
    
  
   
});
    
export default AEDScreen;
