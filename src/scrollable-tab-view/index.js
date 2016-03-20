/**
 * Created by yecl on 16/3/20.
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

var ScrollableTabView = require('react-native-scrollable-tab-view');

class components extends Component {

    render() {
        return (
            <ScrollableTabView>
                <View tabLabel="React"><Text>1</Text></View>
                <View tabLabel="Flow"><Text>2</Text></View>
                <View tabLabel="Jest"><Text>3</Text></View>
            </ScrollableTabView>
        );
    }
}

export default connect()(components);