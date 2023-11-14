import * as React from 'react';
import { View, Image, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import PinIcon from '../components/pin';
//import externalStyle from '../style/externalStyle';

const screenHeight = Dimensions.get('window').height
const noOfAED = 7 // placeholder

const scrollViewHeight = ({ noOfAED }) => {
    return noOfAED % 2 === 1 ? (((noOfAED + 0.5) / 4) * 100).toString() + '%' : (((noOfAED - 0.5)/ 4) * 100).toString() + '%'
};

const pinHeight = ({ noOfAED }) => {
    return noOfAED % 2 === 1 ? ((100/(((noOfAED + 0.5) / 4) * 100)) * 33.33).toString() + '%' : ((100/(((noOfAED - 0.5) / 4) * 100)) * 33.33).toString() + '%'
}


const AEDScreen = ({navigation}) => {

    React.useEffect(() => {
        const returnValue = pinHeight({noOfAED });
        const b = scrollViewHeight({noOfAED })
        console.log(returnValue)
        console.log(b)
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <PinIcon style={styles.pin}/>
                    <PinIcon style={styles.pin}/>
                    <PinIcon style={styles.pin}/>
                    <PinIcon style={styles.pin}/>
                    <PinIcon style={styles.pin}/>
                    <PinIcon style={styles.pin}/>
                    <PinIcon style={styles.pin}/>
                </ScrollView>
            </View>
        </View>
        
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#15202b',
        paddingLeft: (screenHeight * 0.025),
        paddingRight: (screenHeight * 0.025),
        paddingTop: (screenHeight * 0.025) ,
        paddingBottom: (screenHeight * 0.025),
    },
    subContainer: {
        flex: 1,
        backgroundColor: '#192734',
        height: '100%' ,
        width: '100%',
    },
    scrollView:{
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
        flexDirection: 'row',
        height: scrollViewHeight({noOfAED })
    },
    pin : {
        width: '50%',
        height: pinHeight({noOfAED }),
        marginBottom: '22%',
    }
   
});
    
export default AEDScreen;
