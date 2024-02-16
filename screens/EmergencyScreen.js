import React, {useState} from 'react';
import { View, ScrollView, TouchableOpacity , Text, StyleSheet, Image, Dimensions, Linking } from 'react-native';
import jsonData from '../assets/JSON/emergency_text.json'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import HeaderWithInfo from '../components/presentation/header_with_info';
import styles from '../styles';

const screenHeight = Dimensions.get('window').height


const EmergencyScreen = ({navigation}) => {

    const [switchSideLeft, setSwitchSideLeft] = useState(true);


    const onPressSwitch = (left) => {
        if(switchSideLeft === left){
            setSwitchSideLeft(!switchSideLeft); 
        } 
      };

    const callNumber = (phone) => {
        let phoneNumber = phone;
        if (Platform.OS !== 'android') {
            phoneNumber = `telprompt:${phone}`;
          }
          else  {
            phoneNumber = `tel:${phone}`;
          }
          Linking.canOpenURL(phoneNumber)
          .then(supported => {
            if (!supported) {
              Alert.alert('Phone number is not available');
            } else {
              return Linking.openURL(phoneNumber);
            }
          })
          .catch(err => console.log(err));
    }

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
                <ScrollView>

                <HeaderWithInfo title={'What to do in a heart emergency'} textContainerStyle={styles.textContainerCentered}>
                    <Text style={[styles.text, styles.paragraph]}>{jsonData.firstParagraph}</Text>
                    <View style={styles.bulletPointContainer}>
                        <Text style={styles.text}>1.</Text>
                        <Text style={styles.text}>{jsonData.bulletPoints.first}</Text>
                    </View>
                    <View style={styles.bulletPointContainer}>
                        <Text style={styles.text}>2.</Text>
                        <Text style={styles.text}>{jsonData.bulletPoints.second}</Text>
                    </View>
                    <View style={styles.bulletPointContainer}>
                        <Text style={styles.text}>3.</Text>
                        <Text style={styles.text}>{jsonData.bulletPoints.third}</Text>
                    </View>
                </HeaderWithInfo>

                <HeaderWithInfo title={'What to do in a heart emergency'} textContainerStyle={styles.textContainerCentered}>
                    <TouchableOpacity style={[styles.phoneButton, {backgroundColor: '#018489', }]} 
                        onPress={() => callNumber(0)}
                    > 
                        <Image 
                            source={ require('../assets/images/phone.png') }
                            resizeMode='contain'
                            style={{height: '75%', width: '20%'}}
                        />
                        <Text  style={styles.phoneNumberText}>+44 (0) 141 548 2222</Text>
                    </TouchableOpacity>
                </HeaderWithInfo>

                <HeaderWithInfo title={'What to do in a heart emergency'} textContainerStyle={styles.textContainerCentered}>
                <TouchableOpacity style={[styles.phoneButton, {backgroundColor: '#AB1010'}]} 
                        onPress={() => callNumber(0)}
                        > 
                            <Image 
                                source={ require('../assets/images/phone.png') }
                                resizeMode='contain'
                                style={{height: '75%', width: '20%'}}
                            />
                            <Text style={styles.phoneNumberText}>999</Text>
                        </TouchableOpacity>
                </HeaderWithInfo>
                

                </ScrollView>
            ) : (
                <>
                    <View style={styles.subContainer}>
                        <Text style={styles.title}>Hands-only CPR</Text>
                    </View>
                    
                    <View style={{flex:1, position:'relative',}}>
                        <View style={styles.splitContainer}>
                            
                            <View style={styles.allInfoContainer}>
                                <View style={ styles.informationAndImageSubContainer}>
                                    <View style={ styles.informationContainer}>
                                        <Text style={styles.cprText}>1. </Text>
                                        <Text style={[styles.cprText, {flexShrink: 1}]}>{jsonData.cpr.first}</Text>
                                    </View>

                                    <View style={ {flex:1, justifyContent:'center'}}>
                                        <Image 
                                            source={require('../assets/images/cpr.png')}
                                            resizeMode='contain'
                                            style={styles.cprImage}
                                        />
                                    </View>
                                </View>

                                <View style={ styles.informationAndImageSubContainer}>
                                    <View style={ styles.informationContainer}>
                                        <Text style={styles.cprText}>2. </Text>
                                        <Text style={[styles.cprText, {flexShrink: 1}]}>{jsonData.cpr.second}</Text>
                                    </View>

                                    <View style={ {flex:1, justifyContent:'center'}}>
                                        <Image 
                                            source={require('../assets/images/cpr2.png')}
                                            resizeMode='contain'
                                            style={styles.cprImage}
                                        />
                                    </View>
                                </View>

                                <View style={ styles.informationAndImageSubContainer}>
                                    <View style={ styles.informationContainer}>
                                        <Text style={styles.cprText}>3. </Text>
                                        <Text style={[styles.cprText, {flexShrink: 1}]}>{jsonData.cpr.third}</Text>
                                    </View>

                                    <View style={ {flex:1, justifyContent:'center'}}>
                                        <Image 
                                            source={require('../assets/images/cpr3.png')}
                                            resizeMode='contain'
                                            style={styles.cprImage}
                                        />
                                    </View>
                                </View>

                                <View style={ styles.informationAndImageSubContainer}>
                                    <View style={ styles.informationContainer}>
                                        <Text style={styles.cprText}>4. </Text>
                                        <Text style={[styles.cprText, {flexShrink: 1}]}>{jsonData.cpr.fourth}</Text>
                                    </View>

                                    <View style={ {flex:1, justifyContent:'center'}}>
                                        <Image 
                                            source={require('../assets/images/cpr4.png')}
                                            resizeMode='contain'
                                            style={styles.cprImage}
                                        />
                                    </View>
                                </View>

                                <View style={ styles.informationAndImageSubContainer}>
                                    <View style={ styles.informationContainer}>
                                        <Text style={styles.cprText}>5. </Text>
                                        <Text style={[styles.cprText, {flexShrink: 1}]}>{jsonData.cpr.fifth}</Text>
                                    </View>

                                    <View style={ {flex:1, justifyContent:'center'}}>
                                        <Image 
                                            source={require('../assets/images/heartWhite.png')}
                                            resizeMode='contain'
                                            style={styles.cprImage}
                                        />
                                    </View>
                                </View>
                               
                            
                                
                            </View>
                            
                        </View>

                        <View style={styles.slitInContainer}>
                            <View style={[styles.halfContainer, {marginRight: 3}]}>
                            </View>
                            <View style={styles.halfContainer}>
                           </View>

                        </View>

                    </View>
                </>
            ) }
            
        </View>
        
    );
};
    
export default EmergencyScreen;