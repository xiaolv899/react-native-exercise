/**
 * Created by yecl on 16/3/14.
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

import t,{form} from 'tcomb-form-native';
var Form = form.Form;

// here we are: define your domain model
var Person = t.struct({
    name: t.String,              // a required string
    surname: t.maybe(t.String),  // an optional string
    age: t.Number,               // a required number
    rememberMe: t.Boolean,        // a boolean
    //'用户名': t.Date
});

var options = {};

class AwesomeProject extends Component{

    onPress () {
        // call getValue() to get the values of the form
        var value = this.refs.form.getValue();
        if (value) { // if validation fails, value will be null
            console.log(value); // value here is an instance of Person
        }
    }

    render(){
        return (
            <View style={styles.container}>
                {/* display */}
                <Form
                    ref="form"
                    type={Person}
                    options={options}
                    />
                <TouchableHighlight style={styles.button} onPress={()=>this.onPress()} underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableHighlight>
            </View>
        );
    }
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

export default connect()(AwesomeProject);

//export default AwesomeProject;
