/**
 * Created by yecl on 16/3/7.
 */
import React, {
    Alert
} from 'react-native';

const alertMessage = (text, onPress)=> {
    return Alert.alert(
        '提示',
        text,
        [
            {
                text: '确定', onPress: (text) => {
                onPress && onPress(text);
            }, type: 'default'
            }
        ]
    )
};

export default alertMessage;