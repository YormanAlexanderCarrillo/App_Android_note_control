import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { windowWidth, windowHeight } from "../../Utils/Constants";

export default function RegisterForm() {
    const [isLoading, setIsLoading] = useState(true);
  return (
    <View style={styles.container}>
      <View style={styles.containerForm}>
        <Text style={styles.text}>Registro</Text>
        <TextInput
          style={styles.InputText}
          placeholder="Nombre"
          inputMode="text"
        />
        <TextInput
          style={styles.InputText}
          placeholder="Apellido"
          inputMode="text"
        />
        <TextInput
          style={styles.InputText}
          placeholder="Correo"
          inputMode="email"
        />
        <TextInput
          style={styles.InputText}
          placeholder="Contraseña"
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.btnRegister}>
          <AntDesign name="checkcircleo" size={24} color="black" />
          <Text style={styles.textBtns}>Registrar</Text>
          <ActivityIndicator size="small" color="#ccb502" animating={isLoading} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#ebf3ff",
  },
  containerForm: {
    backgroundColor: "#ccb502",
    borderRadius: 30,
    width: windowWidth * 0.9,
    paddingVertical: windowHeight * 0.07,
  },
  text: {
    fontSize: 30,
    fontStyle: "normal",
    color: "#000000",
    textAlign: "center",
    paddingTop: windowHeight * 0.01,
    paddingBottom: windowHeight * 0.05,
  },
  InputText: {
    backgroundColor: "#dbe8ff",
    height: windowHeight * 0.08,
    marginTop: windowHeight * 0.02,
    marginLeft: windowWidth * 0.1,
    marginRight: windowWidth * 0.1,
    borderRadius: 20,
    fontSize: 15,
    paddingLeft: windowWidth*0.05,
  },
  btnRegister: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    marginTop: windowHeight * 0.05,
    marginBottom: windowHeight * 0.03,
    marginLeft: windowWidth * 0.1,
    marginRight: windowWidth * 0.1,
    borderRadius: 20,
    height: windowHeight * 0.06,
    justifyContent: "center",
    flexDirection: "row",
  },
  textLogin: {
    color: "#ffffff",
    alignSelf: "center",
    fontSize: 15,
    
  },
  textBtns: {
    fontSize: 15,
    color: "#000000",
    marginLeft: windowWidth* 0.04,
    marginRight: windowWidth* 0.04,
  },
});
