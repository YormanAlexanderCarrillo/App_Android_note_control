import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileScreen({checkToken}) {
  const logout = async () => {
    try {
      await AsyncStorage.removeItem("Token");
      console.log("Datos eliminados");
      checkToken();
    } catch (error) {
      console.log("No se pudo eliminar los datos");
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TouchableOpacity  onPress={logout}>
        <Text>Salir</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
