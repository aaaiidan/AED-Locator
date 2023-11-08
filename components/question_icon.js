import {Image, TouchableOpacity} from "react-native";

const openHelpScreen = ({navigation}) => (
    console.log("hello")
);

const QuestionIcon = (navigation) => (
    <TouchableOpacity onPress={() => openHelpScreen({navigation})}>
        <Image
        source={require('../assets/images/question_icon.png')}
        style={{ width: 25, height: 25 }}
        />
    </TouchableOpacity>
  );

export default QuestionIcon;