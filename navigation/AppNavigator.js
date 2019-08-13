import React from "react";
import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator,
} from "react-navigation";

import MainTabNavigator, {
  PhotoStack,
  QeustionsStack,
} from "./MainTabNavigator";
import { useScreens } from "react-native-screens";
useScreens(); //https://github.com/react-navigation/react-navigation.github.io/blob/source/docs/react-native-screens.md

import PhotoScreen from "../screens/PhotoScreen";
// import CheckAnoScreen from '../screens/CheckAnoScreen';
import HomeScreen from "../screens/HomeScreen";
// import MetaQuestionsScreen from "../screens/MetaQuestionScreen";
import loginCodeCheckScreen from "../screens/loginCodeCheckScreen";
import QuestionsScreenPage from "../screens/QuestionsScreenPage";
import EndScreen from "../screens/EndScreen";
export default createAppContainer(
  createStackNavigator({
    Photo: { screen: PhotoScreen },
    login: { screen: loginCodeCheckScreen },
    q_1: { screen: QuestionsScreenPage, params: { page: 1 } },
    q_2: { screen: QuestionsScreenPage, params: { page: 2 } },
    q_3: { screen: QuestionsScreenPage, params: { page: 3 } },
    q_4: { screen: QuestionsScreenPage, params: { page: 4 } },
    q_5: { screen: QuestionsScreenPage, params: { page: 5 } },
    q_6: { screen: EndScreen },
  }),
);
