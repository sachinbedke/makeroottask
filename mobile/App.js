import { StyleSheet } from 'react-native'
import React from 'react'
import Home from './screens/Home'
import { Provider } from "react-redux"
import reduxStore from './redux/store'
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { NavigationContainer } from "@react-navigation/native"
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Card from './screens/Card'
const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()


const App = () => {
  return <NavigationContainer NavigationContainer >
    <Provider store={reduxStore}>
      <Tab.Navigator screenOptions={{ headerShown: true }} >
        <Tab.Screen options={{ headerShown: false, title: "aa", tabBarBadge: 3, tabBarIcon: ({ color, size }) => <AntDesign name="home" size={24} color="black" /> }} name='home' component={Home} />
        <Tab.Screen options={{ tabBarBadge: 3, tabBarIcon: ({ color, size }) => <AntDesign name="database" size={24} color="black" /> }} name='Card' component={Card} />
      </Tab.Navigator>

    </Provider>
  </NavigationContainer>
}

export default App

const styles = StyleSheet.create({})