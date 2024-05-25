import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { windowWidth, windowHeight } from "../../Utils/Constants";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";



export default function RegisterForm() {
  const ApiUrl = process.env.EXPO_PUBLIC_API_URL;
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const [dataUser, setDataUser] = useState({
    name:"",
    lastname: "",
    email: "",
    carrier: "",
    password:"",
    phone: ""
  })
 

  const handleRegister = async () => {
    console.log(ApiUrl);
    if (dataUser.password.length >= 6) {
      setIsLoading(true)
      await axios
        .post(`${ApiUrl}/user/registerUser`, dataUser)
        .then((response) => {
          console.log(response.data);
          if (response.data.status === true) {
            setDataUser({
              name: "",
              lastname: "",
              email: "",
              password: "",
            });
            ToastAndroid.showWithGravityAndOffset(
              "Usuario registrado",
              ToastAndroid.LONG,
              ToastAndroid.TOP,
              0,
              100
            );
            navigation.navigate("Login");
            setIsLoading(false)
          }
          if (response.data.status === false) {
            ToastAndroid.showWithGravityAndOffset(
              "Error ",
              ToastAndroid.LONG,
              ToastAndroid.TOP,
              0,
              100
            );
            setIsLoading(false)
          }
        })
        .catch((error) => {
          console.error(error);
          ToastAndroid.showWithGravityAndOffset(
            "Error al registrar",
            ToastAndroid.LONG,
            ToastAndroid.TOP,
            0,
            100
          );
          setIsLoading(false)
        });
    } else {
      ToastAndroid.showWithGravityAndOffset(
        "Contraseña muy corta",
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
        0,
        100
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerForm}>
        <Text style={styles.text}>Registro</Text>
        <TextInput
          style={styles.InputText}
          placeholder="Nombre"
          inputMode="text"
          onChangeText={(text) => setDataUser({...dataUser, name: text})}
          value={dataUser.name}
        />
        <TextInput
          style={styles.InputText}
          placeholder="Apellido"
          inputMode="text"
          onChangeText={(text)=> setDataUser({...dataUser, lastname: text})}
          value={dataUser.lastname}
        />
        <TextInput
          style={styles.InputText}
          placeholder="Correo"
          inputMode="email"
          onChangeText={(text)=> setDataUser({...dataUser, email: text})}
          value={dataUser.email}
        />
        <TextInput
          style={styles.InputText}
          placeholder="Contraseña"
          secureTextEntry={true}
          onChangeText={(text) => setDataUser({ ...dataUser, password: text })}
          value={dataUser.password}
        />
        <TouchableOpacity style={styles.btnRegister} onPress={handleRegister}>
          <AntDesign name="checkcircleo" size={24} color="#ffffff" />
          <Text style={styles.textBtns}>Registrar</Text>
          <ActivityIndicator size="small" color="#ffffff" animating={isLoading} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRegister}>
          <Text
            style={styles.textLogin}
            onPress={() => navigation.navigate("Login")}
          >
            ¿Ya tienes una cuenta?
          </Text>
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
    backgroundColor: "#cda201",
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
    backgroundColor: "#ffffff",
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
    backgroundColor: "#000000",
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
    color: "#000000",
    alignSelf: "center",
    fontSize: 15,
    
  },
  textBtns: {
    fontSize: 15,
    color: "#ffffff",
    marginLeft: windowWidth* 0.04,
    marginRight: windowWidth* 0.04,
  },
});
