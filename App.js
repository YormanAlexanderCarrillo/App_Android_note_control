import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import NavigationAuth from "./src/Navigation/NavigationAuth";
import NavigationUser from "./src/Navigation/NavigationUser";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [existToken, setExistToken] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("Token");
      setExistToken(token !== null);
      setIsLoading(false);
    };
    checkToken();
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <View style={{ flex: 1 }}>
        <NavigationContainer>
          {existToken ? (
            <NavigationUser checkToken={() => setExistToken(false)} />
          ) : (
            <NavigationAuth checkToken={() => setExistToken(true)} />
          )}
        </NavigationContainer>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create();
