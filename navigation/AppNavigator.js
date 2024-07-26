// navigation/AppNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Rental from '../screens/Rental';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen 
        name="Login" 
        component={Login} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Register" 
        component={Register} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Rental" 
        component={Rental} 
        options={{ headerShown: false }} 
      />
    </Stack.Navigator>
  );
}

export default AppNavigator;
