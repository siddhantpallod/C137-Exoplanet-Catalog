import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';

export default function App() {
  return (
    <AppContainer/>
  );
}

const stackNavigator = createStackNavigator({
  Home: {screen : HomeScreen, navigationOptions: {headerShown: false}},
  Details: {screen : DetailsScreen, navigationOptions: {headerShown: false}}
})

const AppContainer = createAppContainer(stackNavigator);