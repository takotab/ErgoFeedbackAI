import React from 'react';
import { Button, ScrollView, StyleSheet, View, Text, FileSystem, Image } from 'react-native';
import { ExpoLinksView, Permissions, ImagePicker } from 'expo';

import { UploadPhotoAsync } from '../uploadFile'
import { Question } from '../components/Questions'

var questions = require('./questions1.json');

export default class QuestionScreen extends React.Component {
    static navigationOptions = {
        title: 'Questions',
    };
    render() {
        const { navigation } = this.props;
        const uri = navigation.getParam('uri', 'Null')
        console.log(questions["Q1"].id + questions["Q1"].question)

        return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

            <Text>
                Questions Screen
                other
            </Text>
            <Question question={questions["Q1"]} />
            < Image
                style={{
                    width: 200,
                    height: 150,
                    resizeMode: 'contain',
                    marginVertical: 8,
                    marginHorizontal: 8,
                }}
                source={{
                    uri:
                        uri,
                }}
            />
        </View>
    };
}