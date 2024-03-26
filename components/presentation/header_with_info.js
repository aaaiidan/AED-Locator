import React from 'react';
import { View, Text } from 'react-native';
import styles from '../../styles';

const HeaderWithInfo = ({title, split = false, children, titleContainerStyle, childContainerStyle}) => {

    return (
        <View style={[styles.headerInfoContainer]}>
            <View style={[styles.textContainer, titleContainerStyle]}>
                <Text style={styles.title}>{title}</Text>
            </View>
            {split ? 
                <View style = {{flexDirection: 'row'}}>
                    {React.Children.map(children, (child, index) => (
                        <View style={[styles.textContainer, childContainerStyle]}>
                            {child}
                        </View>
                    ))}
                </View> 
            : 
                <View style={[styles.textContainer, childContainerStyle]} >
                    {children}
                </View>
            }
        </View>  
        
    );
};

export default HeaderWithInfo;
