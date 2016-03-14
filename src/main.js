/**
 * Created by yecl on 16/3/7.
 */
'use strict';
import React, {
    AppRegistry,
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

import PageResult from './example-webview/webView.js';
import FormPage from './tcomb-form-native/index.js';

/**
 * 配置应用程序的store
 */
import configureStore from './store/configureStore';
let store = configureStore();

class main extends Component {
    render() {
        return (
            <Provider store={store}>
                <PageResult />
            </Provider>
        );
    }
}

AppRegistry.registerComponent('app', () => FormPage);
