/**
 * Created by yecl on 16/3/7.
 */
'use strict';
import React, {
    AppRegistry,
    Navigator,
    Component,
    StyleSheet,
    Text,
    View
} from 'react-native';

import {
    createStore
} from 'redux';

import {
    Provider,
    connect
} from 'react-redux';

import {Router, Route, Schema, Animations, TabBar} from 'react-native-router-flux';

import PageResult from './example-webview/webView.js';
import FormPage from './tcomb-form-native/index.js';
import ImagePicker from './example-image-picker/index.js';

/**
 * 配置应用程序的store
 */
import configureStore from './store/configureStore';
let store = configureStore();

class TabIcon extends React.Component {
    render() {
        return (
            <View>
                <Text style={{alignSelf: 'center'}}>X</Text>
                <Text style={{color: this.props.selected ? 'red' :'black'}}>{this.props.title}</Text>
            </View>
        );
    }
}

class main extends Component {


    render() {
        return (
            <Provider store={store}>
                <Router hideNavBar={true}>
                    <Schema name="modal" sceneConfig={Navigator.SceneConfigs.FloatFromBottom}/>
                    <Schema name="default" sceneConfig={Navigator.SceneConfigs.FloatFromRight}/>
                    <Schema name="withoutAnimation"/>
                    <Schema name="tab" type="switch" icon={TabIcon}/>

                    <Route name="tabbar" title="tabbar" initial={true}>
                        <Router footer={TabBar} hideNavBar={true}
                                tabBarStyle={{borderTopColor:'#CCCCCC',borderTopWidth:1,backgroundColor:'white'}}>
                            <Route name="tab1" schema="tab" title="Form" defaultRoute='tab1_1'>
                                <Router>
                                    <Route name="tab1_1" component={FormPage} title="Tab #1_1"/>
                                    <Route name="tab1_2" component={PageResult} title="Tab #1_2"/>
                                </Router>
                            </Route>
                            <Route name="tab2" schema="tab" title="WebView" hideNavBar={true}>
                                <Router onPop={()=>{console.log("onPop is called!"); return true} }>
                                    <Route name="tab2_1" component={PageResult} title="Tab #2_1"/>
                                    <Route name="tab2_2" title="Tab #2_2"/>
                                </Router>
                            </Route>
                            <Route name="tab3" schema="tab" component={ImagePicker} title="Image" hideTabBar={true}/>
                            <Route name="tab4" schema="tab" title="Tab #4"/>
                            <Route name="tab5" schema="tab" title="Tab #5"/>
                        </Router>
                    </Route>
                </Router>
            </Provider>
        );
    }
}

AppRegistry.registerComponent('app', () => main);
