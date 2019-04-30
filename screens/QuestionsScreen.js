import React from 'react';
import {
    Button,
    ScrollView,
    StyleSheet,
    View,
    Text,
    FileSystem,
    Image,
    Platform
} from 'react-native';
import { ExpoLinksView, Permissions, ImagePicker } from 'expo';

import { UploadPhotoAsync } from '../uploadFile'
import { Question } from '../components/Questions'

// var questions = require('./questions1.json');

export default class QuestionScreen extends React.Component {
    state = {
        answers: {
            'Q1': null
        }
    }
    static navigationOptions = {
        title: 'Questions',
    };


    _renderSingleQ = (key, index, questions) => {
        console.log('render single question key:' + key)

        if (!key in this.state.answers) {
            this.setState({
                answers: {
                    ...this.answers,
                    key: null
                }
            })
        }
        if (this.state.answers[key] == null && 'answer' in questions[key]) {
            this.setState({
                answers: {
                    ...this.answers,
                    key: question.key.answer
                }
            })
        }
        answer = this.state.answers.key

        return [
            <Question
                key={key + index}
                onSelect={answer => {
                    this.onSelect(key, answer, questions);
                }}
                index={index}
                question={questions[key]}
                answer={answer}
            />
        ];
    }

    _renderQuestions = (questions) => {
        const result = [];
        var i = 1;
        while (i < 100) {
            if ('Q' + i in questions) {
                result.push(this._renderSingleQ('Q' + i, i, questions))
                i++
            }
            else {
                console.log('Q' + i + ' not more in json')
                i = 101
            }
        }
        console.log('end while loop')
        return result
    }

    onSelect = (key, answer, questions) => {
        const question = questions[key];
        this.setState({
            ...this.answers,
            key: answer
        })
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
        var questions = navigation.getParam('questions', null)
        if (questions == null) {
            questions = require('../questionData/questions1.json')
        }
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
                    <View>
                        {this._renderQuestions(questions)}
                    </View>

                    <Button
                        title="Volgende"
                        onPress={() => {
                            this.onSubmit();
                        }}
                    />
                </ScrollView>
            </View>

            // <View style={styles.tabBarInfoContainer}>
            //     <View style={[styles.codeHighlightContainer, styles.navigationFilename]}>
            //         <MonoText style={styles.codeHighlightText}>navigation/MainTabNavigator.js</MonoText>
            //     </View>
            // </View>
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
    tabBarInfoContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { height: -3 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
            },
            android: {
                elevation: 20,
            },
        }),
        alignItems: 'center',
        backgroundColor: '#fbfbfb',
        paddingVertical: 20,
    },
    codeHighlightContainer: {
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 3,
        paddingHorizontal: 4,
    },
    navigationFilename: {
        marginTop: 5,
    },
    codeHighlightText: {
        color: 'rgba(96,100,109, 0.8)',
    },
})