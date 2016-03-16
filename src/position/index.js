/**
 * Created by yecl on 16/3/15.
 */
import React,{
    StyleSheet,
    Text,
    View,
    Component,
    Navigator
} from 'react-native';

class components extends Component {

    constructor(props) {
        super(props);
        this.state = {
            initialPosition: 'unknown',
            lastPosition: 'unknown',
        }
    }

    watchID = (null: ?number);

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (initialPosition) => this.setState({initialPosition}),
            (error) => alert(error.message),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );
        this.watchID = navigator.geolocation.watchPosition((lastPosition) => {
            this.setState({lastPosition});
        });
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }

    render() {
        return (
            <View style={{marginTop:64, backgroundColor: 'white'}}>
                <Text>
                    <Text style={styles.title}>Initial position: </Text>
                    {JSON.stringify(this.state.initialPosition)}
                </Text>
                <Text>
                    <Text style={styles.title}>Current position: </Text>
                    {JSON.stringify(this.state.lastPosition)}
                </Text>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    title: {
        fontWeight: '500',
    },
});

export default components;