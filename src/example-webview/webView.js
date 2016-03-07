/**
 * Created by yecl on 16/3/7.
 */
'use strict';

import React, {
    View,
    Text,
    Component,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    WebView
} from 'react-native';

import { connect } from 'react-redux';

import alertMessage from '../components/alertMessage.js';

var HEADER = '#3b5998';
var BGWASH = 'rgba(255,255,255,0.8)';
var DISABLED_WASH = 'rgba(255,255,255,0.25)';

var TEXT_INPUT_REF = 'urlInput';
var WEBVIEW_REF = 'webview';
var DEFAULT_URL = 'http://www.1caifu.com';

const HTML = `
<!DOCTYPE html>\n
<html>
  <head>
    <title>Hello Static World</title>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=320, user-scalable=no">
    <style type="text/css">
      body {
        margin: 0;
        padding: 0;
        font: 62.5% arial, sans-serif;
        background: #ccc;
      }
      h1 {
        padding: 45px;
        margin: 0;
        text-align: center;
        color: #33f;
      }
    </style>
    <script>
    function clickfun(){

    	location.href='appyicaifu:good';
    	return false;
    }
    </script>
  </head>
  <body>
    <h1>Hello Static World</h1>
    <a href="appyicaifu:yicaifu" onclick="return clickfun();">特定url捕获（appYiCaiFu:XXX）</a><br />
    <a href="http://www.163.com/">163</a>
  </body>
</html>
`;

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: HEADER,
        paddingTop: 20
    },
    addressBarRow: {
        flexDirection: 'row',
        padding: 8,
    },
    webView: {
        backgroundColor: BGWASH,
        height: 350,
    },
    addressBarTextInput: {
        backgroundColor: BGWASH,
        borderColor: 'transparent',
        borderRadius: 3,
        borderWidth: 1,
        height: 24,
        paddingLeft: 10,
        paddingTop: 3,
        paddingBottom: 3,
        flex: 1,
        fontSize: 14,
    },
    navButton: {
        width: 20,
        padding: 3,
        marginRight: 3,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: BGWASH,
        borderColor: 'transparent',
        borderRadius: 3,
    },
    disabledButton: {
        width: 20,
        padding: 3,
        marginRight: 3,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: DISABLED_WASH,
        borderColor: 'transparent',
        borderRadius: 3,
    },
    goButton: {
        height: 24,
        padding: 3,
        marginLeft: 8,
        alignItems: 'center',
        backgroundColor: BGWASH,
        borderColor: 'transparent',
        borderRadius: 3,
        alignSelf: 'stretch',
    },
    statusBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 5,
        height: 22,
    },
    statusBarText: {
        color: 'white',
        fontSize: 13,
    },
    spinner: {
        width: 20,
        marginRight: 6,
    },
});

class PageResult extends Component {

    constructor(props) {
        super(props);
        if(HTML){
            DEFAULT_URL = 'about:blank';
        }
        this.state = {
            url: DEFAULT_URL,
            textUrl: DEFAULT_URL,
            inputTextUrl: DEFAULT_URL,
            status: 'No Page Loaded',
            backButtonEnabled: false,
            forwardButtonEnabled: false,
            loading: false,
            scalesPageToFit: true,
            html: HTML
        }
    }

    onNavigationStateChange(navState) {
        this.setState({
            backButtonEnabled: navState.canGoBack,
            forwardButtonEnabled: navState.canGoForward,
            textUrl: navState.url,
            status: navState.title,
            loading: navState.loading,
            scalesPageToFit: true,
            html: null
        });
        console.log('plam', navState);
    }

    goBack() {
        this.refs[WEBVIEW_REF].goBack();
    }

    goForward() {
        this.refs[WEBVIEW_REF].goForward();
    }

    reload() {
        this.refs[WEBVIEW_REF].reload();
    }

    onShouldStartLoadWithRequest(event) {
        //console.log('onShouldStartLoadWithRequest', event);
        if (event.url.indexOf('appyicaifu:') == 0) {
            alertMessage(event.url);
            return false;
        }
        return true;
    }

    handleTextInputChange(event) {
        var url = event.nativeEvent.text;
        if (!/^[a-zA-Z-_]+:/.test(url)) {
            url = 'http://' + url;
        }
        this.setState({inputTextUrl: url});
    }

    onSubmitEditing(event) {
        this.pressGoButton('enter');
    }

    pressGoButton(type) {
        var url = this.state.inputTextUrl.toLowerCase();
        if (url === this.state.url) {
            this.reload();
        } else {
            this.setState({
                textUrl: url,
                url: url,
            });
        }
        // dismiss keyboard
        this.refs[TEXT_INPUT_REF].blur();
    }


    render() {
        return (
            <View style={[styles.container]}>
                <View style={[styles.addressBarRow]}>
                    <TouchableOpacity
                        onPress={()=>this.goBack()}
                        style={this.state.backButtonEnabled ? styles.navButton : styles.disabledButton}>
                        <Text>
                            {'<'}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={()=>this.goForward()}
                        style={this.state.forwardButtonEnabled ? styles.navButton : styles.disabledButton}>
                        <Text>
                            {'>'}
                        </Text>
                    </TouchableOpacity>
                    <TextInput
                        ref={TEXT_INPUT_REF}
                        autoCapitalize="none"
                        defaultValue={this.state.textUrl}
                        onSubmitEditing={(event)=>{this.onSubmitEditing(event)}}
                        onChange={(event)=>{this.handleTextInputChange(event)}}
                        clearButtonMode="while-editing"
                        style={styles.addressBarTextInput}
                        />
                    <TouchableOpacity onPress={()=>{this.pressGoButton()}}>
                        <View style={styles.goButton}>
                            <Text>
                                Go!
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <WebView
                    ref={WEBVIEW_REF}
                    automaticallyAdjustContentInsets={false}
                    injectedJavaScript={'alert("this message from ios");'}
                    style={styles.webView}
                    source={this.state.html?{baseUrl:this.state.url, html:this.state.html}:{uri:this.state.url}}
                    javaScriptEnabled={true}
                    onNavigationStateChange={(navState)=>{this.onNavigationStateChange(navState)}}
                    onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
                    startInLoadingState={true}
                    scalesPageToFit={this.state.scalesPageToFit}
                    />
                <View style={styles.statusBar}>
                    <Text style={styles.statusBarText}>{this.state.loading ? '加载中' : this.state.status}</Text>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state)=> {
    return {state};
}

const mapDispatchToProps = (dispath, onppp)=> {
    return {
        ppp: (navState)=> {
            console.log('onNavigationStateChange', navState);
            console.log('state', onppp);
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PageResult);
