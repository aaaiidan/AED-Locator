import React from 'react';
import { View, Text, Dimensions, ScrollView, Image } from 'react-native';
import HeaderWithInfo from '../../components/presentation/header_with_info';
import styles from '../../styles';

const EmergencyHelp = ({navigation}) => {

    return (
        <View style={styles.container}>
            <ScrollView>
                <HeaderWithInfo title={'Emergency Screen'}>
                    <Text style={styles.helpText}>Pressing the emergency button at the bottom center of the screen will display the emergency screen. In this screen there is an option for contacting emergency services and an option for performing CPR.</Text>
                    <Text style={styles.helpText}>On the emergency services section, there is detailed instructions on what to do if you or someone else is experiencing symptoms of a heart attack. Option to call Campus Secuirty and Emergency Services are available.</Text>
                    <Text style={styles.helpText}>On the CPR section, there are detailed instructions on how to perform CPR following NHS guidelines.</Text>
                </HeaderWithInfo>

                <HeaderWithInfo  title={'Campus Security'}>
                    <Text style={styles.helpText}>The University Security staff are qualified to provide first aid on campus 24 hours a day</Text>
                </HeaderWithInfo>

                <HeaderWithInfo title={'Emergency Services'}>
                    <Text style={styles.helpText}>If someone is unconscious and not breathing normally, call 999 and start CPR straight away.</Text>
                    <Text style={styles.helpText}>When you call 999 for an ambulance, you should be given basic life-saving instructions over the phone, including advice about CPR.</Text>
                </HeaderWithInfo>
            </ScrollView>
        </View>
        
    );
};

export default EmergencyHelp;
