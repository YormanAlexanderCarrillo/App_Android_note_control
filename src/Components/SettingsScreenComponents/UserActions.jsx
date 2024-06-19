import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { windowHeight, windowWidth } from "../../Utils/Constants";

export default function UserActions({ checkToken }) {
  const [switchIsEnable, setSwitchIsEnable] = useState(false);

  const handleSwitch = () => {
    setSwitchIsEnable(!switchIsEnable);
  };

  const handleDeleteAccount= async ()=>{
    try {
      const token = await AsyncStorage.getItem("Token")
      const decode = jwtDecode(token)
      console.log(decode);
    } catch (error) {
      console.log(error);
    }
  }

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
    <View>
      <View style={styles.ViewBtns}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.textBtn}>Actualizar Datos</Text>
        </TouchableOpacity>
        <View
          style={[
            styles.button,
            ,
            {
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            },
          ]}
        >
          <Text style={styles.textBtn}>Activar notificaciones</Text>
          <Switch
            style={{ marginRight: 20 }}
            trackColor={{ false: "#7c7c7c", true: "#03993A" }}
            thumbColor={"#ffffff"}
            value={switchIsEnable}
            onChange={handleSwitch}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleDeleteAccount}>
          <Text style={styles.textBtn} >Eliminar Cuenta</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={logout}>
          <Text style={styles.textBtn}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ViewBtns: {
    width: windowWidth,
    paddingLeft: 30,
    paddingTop: 20,
  },
  button: {
    width: windowWidth * 0.85,
    height: windowHeight * 0.075,
    borderRadius: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    paddingLeft: 20,
    marginBottom: 10,
  },
  textBtn: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
  },
});
