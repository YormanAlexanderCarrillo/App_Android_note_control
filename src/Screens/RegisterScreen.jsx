import { SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";
import RegisterForm from "../Components/RegisterScreenComponents/RegisterForm";

export default function RegisterScreen() {
  return (
    <SafeAreaView style={{flex:1}}>
      <StatusBar />
      <View style={{flex:1}}>
        <RegisterForm />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
