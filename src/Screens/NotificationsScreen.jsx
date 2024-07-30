import React from "react";
import { StyleSheet, View } from "react-native";
import NotificationsComponent from "../Components/NotificationsScreenComponents/NotificationsComponent";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Banner from "../Components/adMob/Banner"
import { windowHeight, windowWidth } from "../Utils/Constants";

export default function NotificationsScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar />
      <View style={{flex:1}}>
        <NotificationsComponent />
      </View>
      <View style={styles.viewBanner}><Banner/></View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  viewBanner: {
    flex: 0.075,
    width: windowWidth,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: windowHeight * 0.001,
  },
});
