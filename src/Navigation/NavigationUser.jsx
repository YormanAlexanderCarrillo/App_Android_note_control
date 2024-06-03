import { StyleSheet, Text, View, Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import HomeScreen from "../Screens/HomeScreen";
import React from "react";
import ProfileScreen from "../Screens/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function NavigationUser({ checkToken }) {
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarActiveTintColor: "#009c68",
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
          component={HomeScreen}
          options={{
            tabBarLabel: "Tareas",
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="calendar" size={size} color={color} />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="AddTask"
          component={HomeScreen}
          options={{
            tabBarLabel: "Agregar tarea",
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="pluscircleo" size={size} color={color} />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Profile"
          options={{
            tabBarLabel: "Perfil",
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="user" size={size} color={color} />
            ),
            headerShown: false,
          }}
        >
          {() => <ProfileScreen checkToken={checkToken} />} 
        </Tab.Screen>
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({});