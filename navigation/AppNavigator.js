import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator, { PhotoStack, QeustionsStack, } from './MainTabNavigator'

import MetaQuestionsScreen from '../screens/MetaQuestionScreen';
export default createAppContainer(createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Home: MainTabNavigator,
  Questions: MetaQuestionsScreen,
}));