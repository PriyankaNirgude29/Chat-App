import React, {} from 'react';
import {  } from 'react-native';

//Importing Components
import Start from './components/Start';
import Chat from './components/Chat';

//Gesture Handler module
import 'react-native-gesture-handler';

//Importing Router and RouterContainer
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//Creating a stack
const Stack = createStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start"
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen
          name="Welcome"
          component={Start}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}