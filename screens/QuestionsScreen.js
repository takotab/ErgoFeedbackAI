import React from 'react';
import {
    // Button,
    ScrollView,
    StyleSheet,
    View,
    Text,
    FileSystem,
    Image,
    Platform,
    Alert,
} from 'react-native';
import { Button } from 'react-native-elements';

import { UploadAnswersAsync } from '../components/uploadJson'
import { SingleQuestion } from '../components/Questions'


export default class QuestionsScreen extends React.Component {
    static navigationOptions = {
        headerTitleStyle: { alignSelf: 'center', fontSize: 20 },
        headerTitle: "Vragen    ",
    };
    state = {
        Q1: null,
        wait: false
    }


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
        if (!key in this.state) {
            // () =>
            this.setState((state, props) => ({
                [key]: null
            }));
            console.log('added ' + key)
        }
        if (this.state[key] == null && 'answer' in questions[key]) {
            // () =>
            this.setState((state, props) => ({
                [key]: questions[key].answer
            }))
            answer = questions[key].answer
            console.log('added default ' + key + '  ' + answer)
        }

        return [
            <View key={key.toString() + '-' + index.toString()}
            // style={{
            //     borderTopColor: '#007AFF',
            //     borderTopWidth: 1,
            // }}
            >
                < SingleQuestion
                    key={key.toString() + "-" + index.toString()}
                    keys={key + "-" + index}
                    onSelect={(answer) => {
                        this.onSelect(key, answer);
                    }}
                    index={index}
                    question={questions[key]}
                    answer={answer}
                />
            </View >
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
        console.log(this.state)
        return result
    }
    onSelect = async (key, answer) => {
        console.log('selected ' + answer + " for " + key)
        this.setState({
            [key]: answer
        })
    }

    onSubmit = async () => {
        this.setState({
            wait: true
        })
        questions = this._loadQuestionsJson()
        let allGood = true
        var i = 1;
        let _quest = []
        let answers = []
        console.log(questions)
        while (i < 50) {
            if ('Q' + i in questions) {
                if (this.state['Q' + i] == null) {
                    Alert.alert('Vraag ' + i + ' vergeten', 'Vult u alstublieft nog vraag ' + i + ' in.')
                    allGood = false
                    i = 101
                }
                else {
                    answers.push(this.state['Q' + i])
                    _quest.push(questions['Q' + i])
                }
                i++
            }
            else {
                i = 101
            }
        }
        // await UploadAnswersAsync(this.state[q], questions[q], temp = false)

        if (allGood) {
            var question_meta_num = parseInt(this.props.navigation.getParam('question_meta_num', '1'))
            await UploadAnswersAsync(answers, _quest, question_meta_num, temp = false)

            question_meta_num = question_meta_num + 1
            console.log('toward meta: ' + question_meta_num)
            this.props.navigation.navigate('Meta', {
                question_meta_num: question_meta_num,
            })
        }
        this.setState({
            wait: false
        })
    }

    renderbutton = () => {
        if (this.state.wait) {
            return <Button
                title="Volgende"
                loading
            />
        }
        else {
            return <Button
                title="Volgende"
                onPress={() => {
                    this.onSubmit();
                }}
            />
        }
    }
    render() {
        console.log('--- QuestionsScreen ---')
        console.log('render')
        return [
            <View style={styles.container}>
                <View style={{
                    padding: 15,
                    backgroundColor: 'white',
                    margin: 5,
                }}></View>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                    <View key={'key'}>
                        {this.renderQuestions()}
                    </View>
                    {this.renderbutton()}
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