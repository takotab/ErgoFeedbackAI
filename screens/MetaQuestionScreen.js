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
        const { navigate } = this.props.navigation;
        var current_questions = navigation.getParam('question_meta_num', '1')
        switch (current_questions) {
            case (1):
                console.log("Metaswitch " + current_questions);
                < QuestionsScreen
                    questions={q1}
                    question_meta_num={1}
                />
            case (2):
                console.log("Metaswitch " + current_questions);
                < QuestionsScreen
                    questions={q2}
                    question_meta_num={2}
                />
            case (3):
                console.log("Metaswitch " + current_questions);
                < QuestionsScreen
                    questions={q3}
                    question_meta_num={3}
                />
            case (4):
                console.log("Metaswitch " + current_questions);
                < QuestionsScreen
                    questions={q4}
                    question_meta_num={4}
                />
        }

    };
}