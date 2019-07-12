import React from 'react';
import {
    ScrollView,
    StyleSheet,
    View, Text,
    // Button,
    StatusBar,
    FileSystem,
    Image,
    ImageManipulator,
    TouchableHighlight
} from 'react-native';
import Constants from 'expo-constants'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import {
    ExpoLinksView,
} from 'expo';

import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SingleQuestion } from '../components/Questions'

import { UploadPhotoAsync } from '../components/uploadFile'
import { w } from '../components/Dimensions'

export default class CheckAnoScreen extends React.Component {
    static navigationOptions = {
        headerTitleStyle: { alignSelf: 'center', fontSize: 20 },
        headerTitle: "Controleer je foto       ",
    };

    state = {
        // user: this.props.navigation.getParam('user', {}),
        poseimg: 'https://storage.googleapis.com/ergoscan-img/6271f2bc_00b2_46a9_9590_1fac749cb492/photo-0-6271f2bc_00b2_46a9_9590_1fac749cb492_w_pose_bbox.png',
    };

    download = (url, name) => {
        const { config, fs } = RNFetchBlob;
        let PictureDir = fs.dirs.PictureDir;
        let options = {
            fileCache: true,
            addAndroidDownloads: {
                useDownloadManager: true,
                notification: true,
                path: PictureDir + name,
                description: t('downloading_file')
            }
        };
        config(options)
            .fetch('GET', url)
            .then(res => {
                if (res.data) {
                    alert(t('download_success'));
                } else {
                    alert(t('download_failed'));
                }
            });
    };
    _goNext = async () => {
        await console.log('goNext');
        this.setState({ wait: true });

        response = await UploadPhotoAsync(this.state.uri)
        json_response = await response.json()
        console.log('cloud reaction:')
        console.log(json_response)
        this.props.navigation.navigate('Questions')

    };

    _goback = async () => {

    };

    _restore = () => {
        this.setState({
            hasPhotos: false,
            uri: '',
            wait: false,
        });
    }

    renderbutton = (name, onpress) => {
        if (this.state.wait) {
            return <Button
                style={styles.button}
                // onPress={this._goNext}
                key={name}
                title={name}
                loading
            />
        }
        else {
            return <Button
                style={styles.button}
                onPress={onpress}
                key={name}
                title={name}
            />

        }
    }
    onSelect = async (key, answer) => {
        console.log('selected ' + answer + " for " + key)
        this.setState({
            answer: answer
        })
    }
    render() {

        console.log(this.state.poseimg)

        return (
            <View>
                <View style={{
                    padding: 25,
                    backgroundColor: 'white',
                    margin: 5,
                }}>
                </View>
                <View style={{
                    justifyContent: 'center'
                }}>
                    <Text style={styles.text}>Kloppen de anotaties in de foto?</Text>

                    <Image source={{ uri: this.state.poseimg }}
                        style={{ width: 300, height: 400 }} />

                    <View style={{
                        padding: 25,
                        backgroundColor: 'white',
                        margin: 5,
                    }}></View>
                    {this.renderbutton('ja', this._goNext)}
                    <View style={{
                        padding: 10,
                        backgroundColor: 'white',
                        margin: 5,
                    }}>
                    </View>
                    <Button
                        key='nope'
                        style={styles.button}
                        onPress={this._restore}
                        title='Nee'
                    />
                </View>

            </View >
        )


    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    buttons: {
        flex: .25,
        flexDirection: 'column',
        justifyContent: 'space-around',
        // alignItems: 'center',
        // fontSize: 18,
        // height: 44,
    },
    button: {
        // padding: 25,
        margin: 100,
        padding: 5,
        width: w(75)
    },
    text: {
        fontSize: 14,
        padding: 6,
        // Color: '#00008b',
        // borderTopColor: '#007AFF',
        // borderTopWidth: 1,
    }
});
