import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator, { PhotoStack, QeustionsStack, } from './MainTabNavigator'
import { useScreens } from 'react-native-screens';
useScreens(); //https://github.com/react-navigation/react-navigation.github.io/blob/source/docs/react-native-screens.md

import LoginFirebase from '../screens/LoginFirebase'
import MetaQuestionsScreen from '../screens/MetaQuestionScreen';
import QuestionsScreen from '../screens/QuestionsScreen';
export default createAppContainer(createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  login: LoginFirebase,
  Home: MainTabNavigator,
  Questions: QuestionsScreen,
  Meta: MetaQuestionsScreen,
}));