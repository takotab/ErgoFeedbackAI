import React from 'react';
import {
    Button,
    ScrollView,
    StyleSheet,
    View,
    Text,
    FileSystem,
    Image,
    Platform,
    Alert,
} from 'react-native';

import { SingleQuestion } from '../components/Questions'


export default class QuestionsScreen extends React.Component {
    state = {
        answers: {
            'Q1': null
        }
    }
    static navigationOptions = {
        title: 'Questions',
    };

    _loadQuestionsJson = () => {
        const { navigation } = this.props;
        var questions = navigation.getParam('questions', null)
        if (questions == null) {
            questions = require('../questionData/questions1.json')
        }
        return questions
    }
    _renderSingleQ = (key, index, questions) => {
        console.log('render single question key:' + key)
        var answer = null
        if (!key in this.state.answers) {
            () =>
                this.setState({
                    answers: {
                        ...this.answers,
                        key: null
                    }
                })
        }
        else if (this.state.answers[key] == null && 'answer' in questions[key]) {
            () =>
                this.setState({
                    answers: {
                        ...this.answers,
                        key: questions[key].answer
                    }
                })
            answer = questions[key].answer
        }

        return [
            < SingleQuestion
                key={key + "-" + index}
                keys={key + "-" + index}
                onSelect={(answer) => {
                    this.onSelect(key, answer);
                }}
                index={index}
                question={questions[key]}
                answer={answer}
            />
        ];
    }

    renderQuestions = () => {
        questions = this._loadQuestionsJson()
        const result = [];
        var i = 1;
        while (i < 50) {
            if ('Q' + i in questions) {
                result.push(this._renderSingleQ('Q' + i, i, questions))
                i++
            }
            else {
                console.log('Q' + i + ' not more in json')
                i = 101
            }
        }
        return result
    }

    onSelect = (key, answer) => {
        console.log('selected ' + answer + " for " + key)
        this.setState({
            answers: {
                ...this.answers,
                [key]: answer
            }
        })
    }

    onSubmit = () => {
        questions = this._loadQuestionsJson()
        let allGood = true
        var i = 1;
        console.log(this.state.answers)
        while (i < 50) {
            if ('Q' + i in questions) {
                if (this.state.answers['Q' + i] == null) {
                    Alert.alert('Vraag ' + i + ' vergeten', 'Vult u alstublieft nog vraag ' + i + ' in.')
                    allGood = false
                    i = 101
                }
                i++
            }
            else {
                i = 101
            }
        }
        // TODO: send answers to cloud

        if (allGood) {
            const { navigate } = this.props.navigation;
            var question_meta_num = navigation.getParam('question_meta_num', '1') + 1
            navigate.push('Questions', {
                question_meta_num: question_meta_num,
            })
        }
    }

    render() {
        console.log('render')
        return [
            <View style={styles.container}>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

                    {this.renderQuestions()}
                    <Button
                        title="Volgende"
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