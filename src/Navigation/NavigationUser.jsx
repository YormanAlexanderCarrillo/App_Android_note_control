import { StyleSheet, Text, View, Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import HomeScreen from "../Screens/HomeScreen";
import React from "react";
import SettingsScreen from "../Screens/SettingsScreen";
import ActivitiesScreen from "../Screens/ActivitiesScreen";
import NotificationsScreen from "../Screens/NotificationsScreen";

const Tab = createBottomTabNavigator();

export default function NavigationUser({ checkToken }) {
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarActiveTintColor: "#ff2759",
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: "Inicio",
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="home" size={size} color={color} />
            ),
            headerShown: false,
          }}
        />

        <Tab.Screen
          name="Tasks"
          component={ActivitiesScreen}
          options={{
            tabBarLabel: "Actividades",
            tabBarIcon: ({ color, size }) => (
              <Entypo name="open-book" size={size} color={color} />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Notifications"
          component={NotificationsScreen}
          options={{
            tabBarLabel: "Notificaciones",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="notifications-circle-outline" size={size} color={color}/>
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Settings"
          options={{
            tabBarLabel: "Configuración",
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="setting" size={size} color={color} />
            ),
            headerShown: false,
          }}
        >
          {() => <SettingsScreen checkToken={checkToken} />} 
        </Tab.Screen>
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({});