import React from 'react';
import { Platform } from 'react-native';

import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIconAnt from '../components/TabBarIconAnt'
import TabBarIcon from '../components/TabBarIcon';
import PhotoScreen from '../screens/PhotoScreen';
import SettingsScreen from '../screens/SettingsScreen';
import QuestionsScreen from '../screens/QuestionsScreen';


const PhotosStack = createStackNavigator({
  Photos: PhotoScreen,
});

PhotosStack.navigationOptions = {
  tabBarLabel: 'Photos',
  tabBarIcon: ({ focused }) => (
    <TabBarIconAnt
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-camera${focused ? '' : '-outline'}`
          : 'md-camera'
      }
    />
  ),
};

const QeustionsStack = createStackNavigator({
  Qeustions: QuestionsScreen,
});

QeustionsStack.navigationOptions = {
  tabBarLabel: 'Questions',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

export default createBottomTabNavigator({
  PhotosStack,
  QeustionsStack,
  SettingsStack,
});
