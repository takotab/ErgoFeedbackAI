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
import MetaQuestionsScreen from "../screens/MetaQuestionScreen";
import QuestionsScreen from "../screens/QuestionsScreen";
import QuestionsScreenPage from "../screens/QuestionsScreenPage";
import EndScreen from "../screens/EndScreen";
export default createAppContainer(
  createStackNavigator({
    q_1: { screen: QuestionsScreenPage, params: { page: 1 } },
    q_2: { screen: QuestionsScreen, params: { page: 2 } },
    q_3: { screen: QuestionsScreen, params: { page: 3 } },
    q_4: { screen: QuestionsScreen, params: { page: 4 } },
    q_5: { screen: QuestionsScreen, params: { page: 5 } },
    Photo: { screen: PhotoScreen },
    Meta: { screen: MetaQuestionsScreen },
    Home: { screen: HomeScreen },
    End: { screen: EndScreen },
  }),
);
