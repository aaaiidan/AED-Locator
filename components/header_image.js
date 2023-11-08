import {Image} from "react-native";

const HeaderImage = () => (
    <Image
      source={require('../assets/images/header_image.jpg')}
      style={{ width: 100, height: 30 }}
    />
  );

export default HeaderImage;