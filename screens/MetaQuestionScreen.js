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

import { QuestionsScreen } from './QuestionsScreen';
import * as q1 from '../questionData/questions1.json';
import * as q2 from '../questionData/questions2.json';
import * as q3 from '../questionData/questions3.json';
import * as q4 from '../questionData/questions4.json';

export default class MetaQuestionsScreen extends React.Component {
    state = {
        current_questions: 1
    }


    render() {
        console.log('---- meta ----')
        var current_questions = this.props.navigation.getParam('question_meta_num', '1')
        console.log('meta' + current_questions)
        console.log(q2)
        console.log('---meta---q2')
        switch (current_questions) {
            case (1):
                console.log("Metaswitch " + current_questions);
                this.props.navigation.navigate('Questions', {
                    questions: { q1 },
                    question_meta_num: current_questions

                })
            case (2):
                console.log("Metaswitch " + current_questions);
                this.props.navigation.navigate('Questions', {
                    questions: q2,
                    question_meta_num: current_questions

                })
            case (3):
                console.log("Metaswitch " + current_questions);
                this.props.navigation.navigate('Questions', {
                    questions: { q3 },
                    question_meta_num: current_questions

                })
            case (4):
                console.log("Metaswitch " + current_questions);
                this.props.navigation.navigate('Questions', {
                    questions: { q4 },
                    question_meta_num: current_questions

                })
            case (5):
                this.props.navigation.navigate('Home')
        }
        return <View><Text>Loading..</Text></View>
    };
}