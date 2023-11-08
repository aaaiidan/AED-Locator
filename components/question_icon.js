import React from "react";
import {Image, TouchableOpacity} from "react-native";

const QuestionIcon = ({navigation}) => (
    <TouchableOpacity onPress={() => navigation.navigate('Help')}>
        <Image
        source={require('../assets/images/question_icon.png')}
        style={{ width: 25, height: 25 }}
        />
    </TouchableOpacity>
  );

export default QuestionIcon;