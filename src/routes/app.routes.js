import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Feather from 'react-native-vector-icons/Feather';

import PostRoutes from '../routes/post.routes'
import Profile from '../pages/Profile';
import Search from '../pages/Search';


const Tab = createBottomTabNavigator();

export default function AppRoutes() {
    return (
    <Tab.Navigator
    tabBarOptions={{
        keyboardHidesTabBar: true,
        showLabel: false,
        style:{
            backgroundColor:'#202225',
            borderTopWidt:0
        },
        activeTintColor: '#FFF'
    }}
    >
        <Tab.Screen 
        name="Home" 
        component={PostRoutes} 
        options={{
            tabBarIcon:({color, size}) =>{
                return <Feather name="home" color={color} size={size} />
            }
        }}
        />
        <Tab.Screen 
        name="Seach" 
        component={Search} 
        options={{
            tabBarIcon:({color, size}) =>{
                return <Feather name="search" color={color} size={size} />
            }
        }}/>
        <Tab.Screen 
        name="Profile" 
        component={Profile} 
        options={{
            tabBarIcon:({color, size}) =>{
                return <Feather name="user" color={color} size={size} />
            }
        }}/>
        
    </Tab.Navigator>
    );
}