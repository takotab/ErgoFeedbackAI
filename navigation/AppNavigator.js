import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator, { PhotoStack, QeustionsStack, } from './MainTabNavigator'
import { useScreens } from 'react-native-screens';
useScreens(); //https://github.com/react-navigation/react-navigation.github.io/blob/source/docs/react-native-screens.md

import PhotoScreen from '../screens/PhotoScreen';
import HomeScreen from '../screens/HomeScreen'
import MetaQuestionsScreen from '../screens/MetaQuestionScreen';
import QuestionsScreen from '../screens/QuestionsScreen';
import EndScreen from '../screens/EndScreen'
export default createAppContainer(createSwitchNavigator({
  Photo: PhotoScreen,
  Questions: QuestionsScreen,
  Meta: MetaQuestionsScreen,
  Home: HomeScreen,
  End: EndScreen,
}));