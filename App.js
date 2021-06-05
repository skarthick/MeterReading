/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Homescreen from './dashboard/homescreen';
import Datacapture from './capture/datacapture';

const RootStack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen name="Dashboard" component={Homescreen} />
        <RootStack.Screen name="Data Capture" component={Datacapture} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
export default App;
