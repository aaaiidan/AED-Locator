import React, {useState} from 'react';
import { View, TouchableOpacity , Text, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import jsonData from '../assets/JSON/emergency_text.json'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
//import externalStyle from '../style/externalStyle';

const screenHeight = Dimensions.get('window').height


const EmergencyScreen = ({navigation}) => {

    const [switchSideLeft, setSwitchSideLeft] = useState(true);


    const onPressSwitch = (left) => {
        if(switchSideLeft === left){
            setSwitchSideLeft(!switchSideLeft); 
        } 
      };

    return (
        <View style={styles.container}>
            <View style={styles.switchContainer}>

                <TouchableOpacity 
                    style={[styles.switch, styles.leftSwitch, switchSideLeft ? styles.switchEnabled : null]} 
                    onPress={() => onPressSwitch(false)}
                    activeOpacity={1}
                >
                    <Text style={styles.textButton}>Emergency Contact</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.switch, styles.rightSwitch, !switchSideLeft ? styles.switchEnabled : null]}  
                    onPress={() => onPressSwitch(true)}
                    activeOpacity={1}
                >
                    <Text style={styles.textButton}>Perform CPR</Text>
                </TouchableOpacity>

            </View>
            {switchSideLeft ? (
                <>
                    <View style={styles.subContainer2}>
                        <Text style={styles.name}>What to do in a heart emergency</Text>
                    </View>

                    <View style={[styles.subContainer2, { marginBottom: '5%', height: '45%'}]}>
                        <Text style={[styles.text, {marginVertical: '5%', width: '90%', textAlign: 'center'}]}>{jsonData.firstParagraph}</Text>

                        <View style={{width: '80%', alignItems: 'flex-start', flexDirection: 'row', marginBottom: '2%',}}>
                            <Text style={styles.text}>1.</Text>
                            <Text style={styles.text}>{jsonData.bulletPoints.first}</Text>
                        </View>
                        <View  style={{width: '80%', alignItems: 'flex-start', flexDirection: 'row', marginBottom: '2%'}}>
                            <Text style={styles.text}>2.</Text>
                            <Text style={styles.text}>{jsonData.bulletPoints.second}</Text>
                        </View>
                        <View  style={{width: '80%', alignItems: 'flex-start', flexDirection: 'row', marginBottom: '2%'}}>
                            <Text style={styles.text}>3.</Text>
                            <Text style={styles.text}>{jsonData.bulletPoints.third}</Text>
                        </View>
                    </View>

                    <View style={styles.subContainer2}>
                        <Text style={styles.name}>Campus Security</Text>
                    </View>

                    <View style={[styles.subContainer2, { marginBottom: '5%', height: '15%', padding: '5%', }]}>
                        <TouchableOpacity style={{height: '100%', width: '100%', backgroundColor: '#018489', borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}> 
                            <Image 
                                source={ require('../assets/images/phone.png') }
                                resizeMode='contain'
                                style={{height: '75%', width: '20%'}}
                            />
                            <Text style={[styles.name, {fontSize: RFValue(18), width: '100%', position: 'absolute'}]}>+44 (0) 141 548 2222</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.subContainer2}>
                        <Text style={styles.name}>Emergency</Text>
                    </View>

                    <View style={[styles.subContainer2, { marginBottom: '5%', height: '15%', padding: '5%', }]}>
                        <TouchableOpacity style={{height: '100%', width: '100%', backgroundColor: '#AB1010', borderRadius: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}> 
                            <Image 
                                source={ require('../assets/images/phone.png') }
                                resizeMode='contain'
                                style={{height: '75%', width: '20%'}}
                            />
                            <Text style={[styles.name, {fontSize: RFValue(18), width: '100%', position: 'absolute'}]}>999</Text>
                        </TouchableOpacity>
                    </View>
                </>
            ) : (
                <>
                    <View style={styles.subContainer2}>
                        <Text style={styles.name}>Hands-only CPR</Text>
                    </View>
                    <View style={{flex:1, position:'relative',}}>
                        

                        <View style={{flex:1,  flexDirection: 'row', position:'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1}}>
                            
                            <View style={{flex:1, marginRight: 3, justifyContent:'space-evenly' }}>
                                <View style={ {justifyContent:'space-between', flexDirection: 'row'}}>
                                    <View style={ {width: '48%', flexDirection: 'row',}}>
                                        <Text style={styles.cprText}>1.</Text>
                                        <Text style={[styles.cprText, {flexShrink: 1}]}>{jsonData.cpr.first}</Text>
                                    </View>

                                    <View style={ {width: '48%', justifyContent:'center'}}>
                                        <Image 
                                            source={require('../assets/images/cpr.png')}
                                            resizeMode='contain'
                                            style={{height: screenHeight/10, width: '100%'}}
                                        />
                                    </View>
                                </View>

                                <View style={ {justifyContent:'space-between', flexDirection: 'row'}}>
                                    <View style={ {width: '48%', flexDirection: 'row',}}>
                                        <Text style={styles.cprText}>2.</Text>
                                        <Text style={[styles.cprText, {flexShrink: 1}]}>{jsonData.cpr.second}</Text>
                                    </View>

                                    <View style={ {width: '48%', justifyContent:'center'}}>
                                        <Image 
                                            source={require('../assets/images/cpr2.png')}
                                            resizeMode='contain'
                                            style={{height: screenHeight/10, width: '100%'}}
                                        />
                                    </View>
                                </View>

                                <View style={ {justifyContent:'space-between', flexDirection: 'row'}}>
                                    <View style={ {width: '48%', flexDirection: 'row',}}>
                                        <Text style={styles.cprText}>3.</Text>
                                        <Text style={[styles.cprText, {flexShrink: 1}]}>{jsonData.cpr.third}</Text>
                                    </View>

                                    <View style={ {width: '48%', justifyContent:'center'}}>
                                        <Image 
                                            source={require('../assets/images/cpr3.png')}
                                            resizeMode='contain'
                                            style={{height: screenHeight/10, width: '100%'}}
                                        />
                                    </View>
                                </View>

                                <View style={ {justifyContent:'space-between', flexDirection: 'row'}}>
                                    <View style={ {width: '48%', flexDirection: 'row',}}>
                                        <Text style={styles.cprText}>4.</Text>
                                        <Text style={[styles.cprText, {flexShrink: 1}]}>{jsonData.cpr.fourth}</Text>
                                    </View>

                                    <View style={ {width: '48%', justifyContent:'center'}}>
                                        <Image 
                                            source={require('../assets/images/cpr4.png')}
                                            resizeMode='contain'
                                            style={{height: screenHeight/10, width: '100%'}}
                                        />
                                    </View>
                                </View>

                                <View style={ {justifyContent:'space-between', flexDirection: 'row'}}>
                                    <View style={ {width: '48%', flexDirection: 'row',}}>
                                        <Text style={styles.cprText}>5.</Text>
                                        <Text style={[styles.cprText, {flexShrink: 1}]}>{jsonData.cpr.fifth}</Text>
                                    </View>

                                    <View style={ {width: '48%', justifyContent:'center'}}>
                                        <Image 
                                            source={require('../assets/images/heartWhite.png')}
                                            resizeMode='contain'
                                            style={{height: screenHeight/10, width: '100%'}}
                                        />
                                    </View>
                                </View>
                               
                            
                                
                            </View>
                            
                        </View>

                        <View style={{flex:1, flexDirection: 'row',  position:'absolute', top: 0, left: 0, right: 0, bottom: 0}}>
                            <View style={{flex:1, backgroundColor: '#192734', marginRight: 3, justifyContent:'space-evenly' }}>
                            </View>
                            <View style={{flex:1, backgroundColor: '#192734',}}>
                           </View>

                        </View>

                    </View>
                </>
            ) }
            
        </View>
        
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: '#15202b',
        paddingLeft: (screenHeight * 0.025),
        paddingRight: (screenHeight * 0.025),
        paddingTop: (screenHeight * 0.0125) ,
        paddingBottom: (screenHeight * 0.025),
    },

    switchContainer: {
        width: '100%',
        height: '5%',
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: '5%',
    },

    switch: {
        width: '45%',
        height: '100%', 
        justifyContent: 'center',
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderColor:'#018489', 
    },

    leftSwitch: {
        borderLeftWidth: 2,
    },

    rightSwitch: {
        borderRightWidth: 2,
    },

    text: {
        textAlign:'left', 
        color: 'white',
        fontSize: RFValue(14),
    },

    cprText: {
        textAlign:'left', 
        color: 'white',
        fontSize: RFValue(13),
    },

    textButton: {
        textAlign:'center', 
        color: 'white',
        fontSize: RFValue(14),
    },

    switchEnabled: {
        backgroundColor: '#018489',
    },

    subContainer: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '100%',
        width: '100%',
    },

    mediumFullInfoContainer: {
        flexDirection: 'column',
        width: '100%',
        marginBottom: '3%',
    },

    subContainer2: {
        minHeight: 25,
        backgroundColor: '#192734',
        marginBottom: 3,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    name:{
        textAlign:'center',
        color: '#FFFFFF',
        fontSize: RFValue(14),
        fontWeight: 'bold',
    },
   
});
    
export default EmergencyScreen;
