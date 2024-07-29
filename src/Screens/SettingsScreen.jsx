import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Header from "../Components/HomeScreenComponents/Header";
import UserActions from "../Components/SettingsScreenComponents/UserActions";

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
});
