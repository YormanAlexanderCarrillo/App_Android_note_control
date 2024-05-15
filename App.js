import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import NavigationAuth from "./src/Navigation/NavigationAuth";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <View style={{flex:1}}>
        <NavigationContainer>
          <NavigationAuth />
        </NavigationContainer>
        
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create();
