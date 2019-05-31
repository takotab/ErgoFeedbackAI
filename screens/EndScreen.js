import React from 'react';
import {
    ScrollView,
    StyleSheet,
    View, Text,
    Button,
    StatusBar,
    FileSystem,
    Image,
    Platform,
    TouchableHighlight,
    Linking,
} from 'react-native';

import { UploadAnswersAsync } from '../components/uploadJson';

export default class EndScreen extends React.Component {
    state = {
        send: false,
        response: '',
    }
    _response() {
        if (this.state.send) {
            if (this.state.response === 'fail') {
                return <Text style={styles.text}>Er is iets mis gegaan. U krijgt binnen 24 uur een reactie. </Text>
            }
            if (this.state.response === 'succes') {
                // Todo show link
                return < Text style={styles.text} >U heeft een mailtje gekregen met uw rapport.</Text >
                //     < Text style={styles.text} onPress={() => Linking.openURL('https://google.com')} >
                //         Kli
                // </ Text >

            }
        }

        else {
            return (
                <View>
                    <Text style={styles.text}>
                        Je krijgt een email met het rapport.
                </Text>
                    <Text style={styles.text}>Het kan even duren. </Text>
                </View>
            )
        }
        console.log('somthing went wrong in _response')
        console.log(this.state)

    }
    _check_response = async () => {
        if (this.state.send == false) {
            r = await UploadAnswersAsync('', '', '', '', 'true')
            this.setState({
                send: true,
                response: r.result
            })
            console.log('Everything uploaded')
            console.log(r.result === 'fail')
        }
    }
    render() {
        this._check_response()
        return <View style={styles.container} >
            <StatusBar
                backgroundColor="black"
                barStyle="dark-content"
            />
            <View style={{
                padding: 25,
                backgroundColor: 'white',
                margin: 5,
            }}></View>
            {this._response()}
            {/* <Text style={styles.text}>
                Mocht u na 5 minuten geen bericht hebben.
            </Text> */}
        </View>
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
        // width: w(75)
    },
    text: {
        fontSize: 14,
        padding: 6,
        color: 'rgba(96,100,109, 0.8)',
        fontSize: 20
        // borderTopColor: '#007AFF',
        // borderTopWidth: 1,
    }
});
