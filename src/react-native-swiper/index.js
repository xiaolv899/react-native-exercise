/**
 * Created by yecl on 16/3/16.
 */
import React,{
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    TouchableOpacity,
    Component,
    Image
} from 'react-native';

import { connect } from 'react-redux';

var Swiper = require('react-native-swiper');

var list = [
    {title: '九天云财富'},
    {title: '九天云财富机构名称'},
    {title: '九天云财富机构名称1'},
    {title: '九天云财富机构'},
    {title: '九天云财富机构名称3'},
];

var styles = StyleSheet.create({
    wrapper: {
        // backgroundColor: '#f00',
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    slide1: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        backgroundColor: '#9DD6E3',
        paddingTop: 20
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5',
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9',
    },
    text: {
        color: '#333',
        fontSize: 12,
        fontWeight: 'bold'
    },
    image: {
        flex: 1,
    },
    touchs: {
        marginLeft: 10,
        marginRight: 5,
        marginBottom: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 5,
        backgroundColor: '#fff',
    },
    touchson: {
        borderColor: '#95939B',
        backgroundColor: '#95939B',
        flexDirection: 'row'
    }
})

class components extends Component {

    render() {
        return (
            <View>
                <Swiper style={styles.wrapper} height={220} loop={false}>
                    <View style={styles.slide1}>
                        <TouchableHighlight onPress={()=>{}} style={styles.touchs}><Text
                            style={styles.text}>九天云财富</Text></TouchableHighlight>
                        <TouchableHighlight onPress={()=>{}} style={styles.touchs}><Text
                            style={styles.text}>九天云财富机构名称</Text></TouchableHighlight>
                        <TouchableHighlight onPress={()=>{}} style={styles.touchs}><Text style={styles.text}>
                            Swiper3</Text></TouchableHighlight>
                        <TouchableHighlight onPress={()=>{}} style={styles.touchs}><Text
                            style={styles.text}>Swiper4</Text></TouchableHighlight>
                        <TouchableOpacity onPress={()=>{}}
                                          style={[styles.touchs,styles.touchson,null]}><Text>j</Text><Text
                            style={styles.text}>Hello Swiper5</Text></TouchableOpacity>
                    </View>
                    <View style={styles.slide2}>
                        <Text style={styles.text}>Beautiful</Text>
                    </View>
                    <View style={styles.slide3}>
                        <Text style={styles.text}>And simple</Text>
                    </View>
                    <View style={styles.slide3}>
                        <Text style={styles.text}>And simple</Text>
                    </View>
                </Swiper>
            </View>
        );
    }
}

export default connect()(components);