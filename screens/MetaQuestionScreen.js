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
import q1 from '../questionData/questions1.json';
import q2 from '../questionData/questions2.json';
import q3 from '../questionData/questions3.json';
import q4 from '../questionData/questions4.json';
import q5 from '../questionData/questions5.json';


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
        if (current_questions == 1) {
            console.log("Metaswitch " + current_questions);
            this.props.navigation.navigate('Questions', {
                questions: { q1 },
                question_meta_num: current_questions

            })
        }
        else if (current_questions == 2) {

            console.log("Metaswitch " + current_questions);
            this.props.navigation.navigate('Questions', {
                questions: q2,
                question_meta_num: current_questions

            })
        }
        else if (current_questions == 3) {

            console.log("Metaswitch " + current_questions);
            this.props.navigation.navigate('Questions', {
                questions: q3,
                question_meta_num: current_questions

            })
        }

        else if (current_questions == 4) {
            console.log("Metaswitch " + current_questions);
            this.props.navigation.navigate('Questions', {
                questions: q4,
                question_meta_num: current_questions

            })
        }

        else if (current_questions == 6) {
            console.log("Metaswitch " + current_questions);
            this.props.navigation.navigate('Questions', {
                questions: q5,
                question_meta_num: current_questions

            });
        }
        else {
            console.log("Metaswitch hard " + 6);
            console.log("Metaswitch " + current_questions);
            this.props.navigation.navigate('Home')
        }
        return <View><Text>Loading..</Text></View>
    };
}