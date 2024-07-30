import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
import React from "react";
import Header from "../Components/HomeScreenComponents/Header";
import UserActions from "../Components/SettingsScreenComponents/UserActions";
import BannerSettings from "../Components/adMob/BannerSettings";

export default function SettingsScreen({ checkToken }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar />
      <View style={styles.containerHeader}>
        <Header />
      </View>
      <View style={styles.containerActions}>
        <UserActions checkToken={checkToken} />
      </View>
      <View style={styles.viewBanner}>
        <BannerSettings />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F6F6F6",
  },
  containerHeader: {
    flex: 0.35,
    alignItems: "center",
    justifyContent: "center",
  },
  containerActions: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  viewBanner: {
    flex: 0.075,
    width: windowWidth,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: windowHeight * 0.001,
  },
});
