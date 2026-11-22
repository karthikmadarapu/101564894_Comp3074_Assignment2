// ------------------------------------------------------------
// App.js  (entry point)
// Sets up navigation: a Drawer with two screens, Main and About.
// INTERVIEW TIP: "add a screen / rename a menu item" -> edit THIS file.
// ------------------------------------------------------------
import 'react-native-gesture-handler'; // keep this as the first import
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import MainScreen from './screens/MainScreen';
import AboutScreen from './screens/AboutScreen';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    // NavigationContainer holds the navigation state for the whole app
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Main">
        {/* name = the route id used in navigation.navigate('...') */}
        <Drawer.Screen
          name="Main"
          component={MainScreen}
          options={{ title: 'Pay Calculator' }}
        />
        <Drawer.Screen
          name="About"
          component={AboutScreen}
          options={{ title: 'About' }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
