/**
 * Created by yecl on 16/3/11.
 */
import React,{
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Component,
    TouchableOpacity,
    Image
} from 'react-native';

import {Actions} from 'react-native-router-flux';

var ImagePickerManager = require('NativeModules').ImagePickerManager;

var options = {
    title: 'Select Avatar', // specify null or empty string to remove the title
    cancelButtonTitle: 'Cancel',
    takePhotoButtonTitle: 'Take Photo...', // specify null or empty string to remove this button
    chooseFromLibraryButtonTitle: 'Choose from Library...', // specify null or empty string to remove this button
    /*customButtons: {
     'Choose Photo from Facebook': 'fb', // [Button Text] : [String returned upon selection]
     },*/
    cameraType: 'back', // 'front' or 'back'
    mediaType: 'photo', // 'photo' or 'video'
    videoQuality: 'high', // 'low', 'medium', or 'high'
    durationLimit: 10, // video recording max time in seconds
    maxWidth: 100, // photos only
    maxHeight: 100, // photos only
    aspectX: 2, // android only - aspectX:aspectY, the cropping image's ratio of width to height
    aspectY: 1, // android only - aspectX:aspectY, the cropping image's ratio of width to height
    quality: 0.2, // 0 to 1, photos only
    angle: 0, // android only, photos only
    allowsEditing: false, // Built in functionality to resize/reposition the image after selection
    noData: false, // photos only - disables the base64 `data` field from being generated (greatly improves performance on large photos)
    storageOptions: { // if this key is provided, the image will get saved in the documents directory on ios, and the pictures directory on android (rather than a temporary directory)
        skipBackup: true, // ios only - image will NOT be backed up to icloud
        path: 'images' // ios only - will save image at /Documents/images rather than the root
    }
};

class components extends Component {

    constructor(props) {
        super(props);
        this.state = {
            avatarSource: {},
            avatarWidth: 1,
            avatarHeight: 1,
        }
    }

    selectImage() {
        ImagePickerManager.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePickerManager Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                // You can display the image using either data:
                const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};

                // uri (on iOS)
                //const source = {uri: response.uri.replace('file://', ''), isStatic: true};
                // uri (on android)
                //const source = {uri: response.uri, isStatic: true};

                console.log('image', response);

                this.setState({
                    avatarSource: source,
                    avatarWidth: response.width,
                    avatarHeight: response.height
                });
            }
        });
    }

    render() {
        return (
            <View style={{marginTop:64, backgroundColor: 'white'}}>
                <Text>
                    Welcome to React Native!
                </Text>
                <Button onPress={()=>{this.selectImage()}}>image picker</Button>

                <View style={{marginTop:15,marginBottom:15}}>
                    <Image source={this.state.avatarSource} style={{flex:1,width:this.state.avatarWidth,height:this.state.avatarHeight}} />
                </View>

                <TouchableHighlight onPress={()=>{Actions.tabbar()}}>
                    <Text>Back</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const Button = ({
    onPress,
    style,
    children
    })=> {
    return (
        <View>
            <TouchableOpacity onPress={onPress}
                              style={style || {padding: 16, margin: 4, backgroundColor: '#86C1B9', borderRadius:5}}>
                <Text>{children}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default components;