import { StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormCreateActivities from "../Components/ActivitiesScreenComponents/FormCreateActivities";

export default function ActivitiesScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar />
      <View style={styles.container}>
        <FormCreateActivities/>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#FAFAFA",
    },
    container:{
        flex:1,
    }
});
