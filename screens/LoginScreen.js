import React from 'react';
import View from 'react-native';

import * as firebase from 'firebase';


firebasekeys = require('../firebase-keys.json')
// Initialize Firebase
const firebaseConfig = {
    apiKey: firebasekeys["apikey"],
    authDomain: firebasekeys["authDomain"],
    databaseURL: firebasekeys["databaseURL"],
    storageBucket: firebasekeys["storageBucket"]
};

firebase.initializeApp(firebaseConfig);

import FirebaseLogin from "../FirebaseLogin";


export default class LoginScreen extends React.Component {

    login = (user) => {
        console.log('user loged in!!!')
        console.log(user)
        this.props.navigation.navigate('Home', {
            user: user,
        })
    }

    render() {
        return (
            <View>
                <FirebaseLogin
                    login={(user) => {
                        this.login(user)
                    }}
                />
            </View >
        )
    }
}