import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

import {Home} from '../screens/home';

export function Routes() {
  const {Navigator, Screen} = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
        <Screen name="Home" component={Home} />
      </Navigator>
    </NavigationContainer>
  );
}
