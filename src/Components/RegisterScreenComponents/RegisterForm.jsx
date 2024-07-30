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
  const [isValid, setIsValid] = useState(true);
  const [name, setName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    setIsValid(validatePassword(text));
  };

  const handleRegister = async () => {
    console.log(ApiUrl);
    setIsLoading(true);

    const dataUser = {
      name: name,
      lastname: lastName,
      email: email,
      carrier: "",
      password: password,
      phone: "",
    };
    await axios
      .post(`${ApiUrl}/user/registerUser`, dataUser)
      .then((response) => {
        console.log(response.data);
        if (response.data.status === true) {
          setIsLoading(false);
          setName("");
          setLastName("");
          setEmail("");
          setPassword("");
          ToastAndroid.showWithGravityAndOffset(
            "Usuario registrado",
            ToastAndroid.LONG,
            ToastAndroid.TOP,
            0,
            100
          );
          navigation.navigate("Login");
          
        }
        if (response.data.status === false) {
          ToastAndroid.showWithGravityAndOffset(
            "Error ",
            ToastAndroid.LONG,
            ToastAndroid.TOP,
            0,
            100
          );
          setIsLoading(false);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
        ToastAndroid.showWithGravityAndOffset(
          "Error al registrar",
          ToastAndroid.LONG,
          ToastAndroid.TOP,
          0,
          100
        );
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerForm}>
        {!isValid && (
          <Text style={styles.errorText}>
            La contraseña debe tener al menos 8 caracteres, una letra mayúscula,
            una letra minúscula, un número y un carácter especial.
          </Text>
        )}
        <Text style={styles.text}>Registro</Text>
        <TextInput
          style={styles.InputText}
          placeholder="Nombre"
          inputMode="text"
          onChangeText={(text) => setName(text)}
          value={name}
        />
        <TextInput
          style={styles.InputText}
          placeholder="Apellido"
          inputMode="text"
          onChangeText={(text) => setLastName(text)}
          value={lastName}
        />
        <TextInput
          style={styles.InputText}
          placeholder="Correo"
          inputMode="email"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <TextInput
          style={styles.InputText}
          placeholder="Contraseña"
          secureTextEntry
          onChangeText={handlePasswordChange}
          value={password}
        />

        <TouchableOpacity style={styles.btnRegister} onPress={handleRegister}>
          <AntDesign name="checkcircleo" size={24} color="#ffffff" />
          <Text style={styles.textBtns}>Registrar</Text>
          <ActivityIndicator
            size="small"
            color="#ffffff"
            animating={isLoading}
          />
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
    paddingLeft: windowWidth * 0.05,
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
    marginLeft: windowWidth * 0.04,
    marginRight: windowWidth * 0.04,
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "#6A0DAD",
    marginLeft: 30,
    marginRight: 30,
  },
});
