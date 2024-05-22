import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Platform,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { windowHeight, windowWidth } from "../../Utils/Constants";

export default function LoginForm({ checkUid }) {
  const ApiUrl = process.env.EXPO_PUBLIC_API_URL;
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const [dataLogin, setDataLogin] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    console.log(ApiUrl);
    setIsLoading(true);
    await axios
      .post(`${ApiUrl}/session/signIn`, dataLogin)
      .then((response) => {
        //console.log(response.data);
        if (response.data.status === false) {
          ToastAndroid.showWithGravityAndOffset(
            "Correo o contraseña incorrectos",
            ToastAndroid.LONG,
            ToastAndroid.TOP,
            0,
            100
          );
        }if (response.data.status === true) {
          setDataLogin({
            email: "",
            password: "",
          });
          const token = response.data.token
          saveDataInPhone(token);
          checkUid();
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("El error es: ", error);
        setIsLoading(false);
      });
  };

  const saveDataInPhone = async (token) => {
    try {
      await AsyncStorage.setItem("Token", token);
      console.log("Datos guardados");
    } catch (error) {
      console.log("Error al guardar los datos: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerForm}>
        <Text style={styles.text}>Gestor de Tareas</Text>
        <TextInput
          style={styles.InputText}
          inputMode="email"
          placeholder="Ejemplo@email.com"
          onChangeText={(text) => setDataLogin({ ...dataLogin, email: text })}
          value={dataLogin.email}
        ></TextInput>
        <TextInput
          style={styles.InputText}
          secureTextEntry={true}
          placeholder="Tu contraseña"
          onChangeText={(text) =>
            setDataLogin({ ...dataLogin, password: text })
          }
          value={dataLogin.password}
        ></TextInput>
        <TouchableOpacity>
          <Text style={styles.textForgotPassword}> ¿Olvido su contraseña?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnSingIn} onPress={handleLogin}>
          <MaterialIcons name="login" size={24} color="black" />
          <Text style={styles.textBtns}>Ingresar</Text>
          <ActivityIndicator size="small" color="#000" animating={isLoading} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            style={styles.textRegister}
            onPress={() => navigation.navigate("Register")}
          >
            ¿No tiene una cuenta?
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ebf3ff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    justifyContent: "center",
    alignItems: "center",
  },
  containerForm: {
    backgroundColor: "#ccb502",
    margin: 10,
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
    borderRadius: 15,
    fontSize: 15,
    paddingLeft: 20,
  },
  textForgotPassword: {
    color: "#fff",
    textAlign: "right",
    marginTop: windowHeight * 0.02,
    marginRight: windowWidth * 0.1,
  },
  btnSingIn: {
    alignItems: "center",
    backgroundColor: "#effefa",
    marginTop: windowHeight * 0.05,
    marginBottom: windowHeight * 0.03,
    marginLeft: windowWidth * 0.1,
    marginRight: windowWidth * 0.1,
    borderRadius: 20,
    height: windowHeight * 0.06,
    justifyContent: "center",
    flexDirection: "row",
  },
  textBtns: {
    fontSize: 15,
    color: "#000",
    marginLeft: 20,
    marginRight: 20,
  },
  textRegister: {
    color: "#fff",
    alignSelf: "center",
    fontSize: 15,
  },
});
