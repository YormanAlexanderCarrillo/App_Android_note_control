import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RegisterScreen from "../Screens/RegisterScreen";
import LoginScreen from "../Screens/LoginScreen";
const Tab = createBottomTabNavigator();

export default function NavigationAuth() {
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        initialRouteName="Login"
        screenOptions={{
          tabBarActiveTintColor: "#CAA603",
        }}
      >
        <Tab.Screen
          name="Login"
          component={LoginScreen}
          options={{
            tabBarLabel: "Ingreso",
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="login" size={size} color={color} />
            ),
            headerShown: false,
          }}
        ></Tab.Screen>
        <Tab.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            tabBarLabel: "Registro",
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="form" size={size} color={color} />
            ),
            headerShown: false,
          }}
        ></Tab.Screen>
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({});
