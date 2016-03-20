/**
 * Created by yecl on 16/3/16.
 */
import React,{
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Component
} from 'react-native';

import { connect } from 'react-redux';

import {Actions} from 'react-native-router-flux';

class components extends Component{

    render(){
        return (
            <View style={styles.container}>
                <Button onPress={()=>{Actions.imagePicker()}}>拍照</Button>
                <Button onPress={()=>{Actions.swiper()}}>swiper</Button>
                <Button onPress={()=>{Actions.tabView()}}>tab view</Button>
            </View>
        );
    }
}

const Button = ({style,...buttonProps,children})=>{
    return (
        <TouchableHighlight style={style||styles.button} {...buttonProps} underlayColor='#99d9f4'>
            <Text style={{alignSelf:'center',color:'#fff'}}>{children}</Text>
        </TouchableHighlight>
    )
}

var styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginTop: 50,
        padding: 20,
        backgroundColor: '#ffffff',
    },
    title: {
        fontSize: 30,
        alignSelf: 'center',
        marginBottom: 30
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    button: {
        height: 36,
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    }
});

export default connect()(components);