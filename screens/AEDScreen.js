import React from 'react';
import { View, ScrollView } from 'react-native';
import ImageTextButton from '../components/touchables/image_text_button';
import { useData } from '../DataContext';
import styles from '../styles';


const AEDScreen = ({navigation}) => {
    const{ locations, aeds, imagesBase64 } = useData();
  
    return (
        <View style={styles.container}>
            <ScrollView >
                {locations.map((location) => {
                    let img = null;
                    aeds.map((aed) => {
                        if(aed.LocationRef.id == location.id){
                            img = aed.id in imagesBase64 ? {uri :imagesBase64[aed.id]} : require('../assets/images/placeholder_aed.png')
                        }
                    });
                    return(
                        <ImageTextButton key={location.id} image={img} imageStyle={styles.defaultImageStyle} text={location.Name} textStyle={styles.largeTitle} navigation={navigation} screen={'Map'} action={location} circle={true}/>
                    )
                })}
            </ScrollView>
        </View>
    );
};
export default AEDScreen;
