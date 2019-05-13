import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator, { PhotoStack, QeustionsStack, } from './MainTabNavigator'
import { useScreens } from 'react-native-screens';
useScreens(); //https://github.com/react-navigation/react-navigation.github.io/blob/source/docs/react-native-screens.md

import MetaQuestionsScreen from '../screens/MetaQuestionScreen';
import QuestionsScreen from '../screens/QuestionsScreen';

import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA0ULbNHTYUUY6jO9Bj_Uydg63_oGWDZ2U",
  authDomain: "ergofeedbackai.firebaseapp.com",
  databaseURL: "https://databaseName.firebaseio.com",
  storageBucket: "gs://ergofeedbackai.appspot.com"
};

firebase.initializeApp(firebaseConfig);

export default createAppContainer(createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Home: MainTabNavigator,
  Questions: QuestionsScreen,
  Meta: MetaQuestionsScreen,
}));