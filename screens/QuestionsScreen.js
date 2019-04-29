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

    _renderSingleQ = (key, index) => {
        console.log('render single question key:' + key)
        console.log('type = ' + this.state.questions[key].type)
        return [
            <Question
                key={key + index}
                onSelect={answer => {
                    this.onSelect(key, answer);
                }}
                index={index + 1}
                question={this.state.questions[key]}
                answer={this.state.answers[key]}
            />
        ];
    }

    _renderQuestions = () => {
        const result = [];
        console.log(this.props.questions)
        this.props.questions.forEach((key, index) => {
            result.push(this._renderSingleQ(key, index))
        })
        return result
    }
    onSubmit = () => {
        let allGood = true
        this.state.required.forEach((item, index) => {
            console.log(item)
            if (this.state.answers[item] == null) {
                _index = index + 1
                Alert.alert('Vraag ' + _index + ' vergeten', 'Vult u alstublieft nog vraag ' + _index + ' in.')
                allGood = false
            }
        });
        if (allGood) {
            const { navigate } = this.props.navigation;
            navigate('Questions', {
                name: 'Jane',
                uri: this.state.uri,
            })
        }
    }

    render() {
        console.log('render')
        const { navigation } = this.props;
        const uri = navigation.getParam('uri', 'Null')
        // const questions = this.props.questions

        return [
            <View style={styles.container}>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                    <View style={styles.welcomeContainer}>
                        <Image
                            source={
                                __DEV__
                                    ? require('../assets/images/robot-dev.png')
                                    : require('../assets/images/robot-prod.png')
                            }
                            style={styles.welcomeImage}
                        />
                    </View>
                    {/* <Text style={{ fontSize: 16, color: "#666", textAlign: "right" }}>
                        {this.props.progress * 100}%
        </Text> */}
                    {this._renderQuestions()}

                    <Button
                        title="Volgende "
                        onPress={() => {
                            this.onSubmit();
                        }}
                    />
                </ScrollView>
            </View>
        ];

    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    developmentModeText: {
        marginBottom: 20,
        color: 'rgba(0,0,0,0.4)',
        fontSize: 14,
        lineHeight: 19,
        textAlign: 'center',
    },
    contentContainer: {
        paddingTop: 30,
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
})