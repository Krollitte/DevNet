import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import Home from '../pages/Home';
import PostDetails from '../pages/PostDetails';
import Profile from '../pages/Profile';

export default function PostRoutes() {
 return (
   <Stack.Navigator>
    <Stack.Screen name="Home" component={Home} options={{headerShown: false }}/>
    <Stack.Screen name="PostDetails" component={PostDetails} options={{headerShown: false }}/>
    <Stack.Screen name="Profile" component={Profile} options={{headerShown: false }} />
   </Stack.Navigator>
  );
}