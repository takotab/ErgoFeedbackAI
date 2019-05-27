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
    TouchableHighlight
} from 'react-native';

export default class EndScreen extends React.Component {

    render() {
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
            <Text style={styles.text}>
                Je krijgt een email met het rapport.
            </Text>
            <Text style={styles.text}>
                Het kan even duren.

            </Text>
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
