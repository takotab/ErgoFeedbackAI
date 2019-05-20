import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator, { PhotoStack, QeustionsStack, } from './MainTabNavigator'
import { useScreens } from 'react-native-screens';
useScreens(); //https://github.com/react-navigation/react-navigation.github.io/blob/source/docs/react-native-screens.md

import PhotoScreen from '../screens/PhotoScreen';
import HomeScreen from '../screens/HomeScreen'
import MetaQuestionsScreen from '../screens/MetaQuestionScreen';
import QuestionsScreen from '../screens/QuestionsScreen';
export default createAppContainer(createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Photo: PhotoScreen,
  Questions: QuestionsScreen,
  Meta: MetaQuestionsScreen,
  Home: HomeScreen,
}));