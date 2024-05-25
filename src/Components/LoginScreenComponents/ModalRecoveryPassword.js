import {
  ActivityIndicator,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { windowHeight, windowWidth } from "../../Utils/Constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function ModalRecoveryPassword({ visible, onClose }) {
  const ApiUrl = process.env.EXPO_PUBLIC_API_URL;
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState({
    email: "",
  });

  const recoveryPassword = async () => {
    try {
      const token = await AsyncStorage.getItem("Token");
      await axios
        .post(`${ApiUrl}/session/sendEmail`, email)
        .then((Response) => {
          console.log(Response.data);
          setIsLoading(true);
          if (Response.data.status == true) {
            ToastAndroid.showWithGravityAndOffset(
              "Correo enviado",
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM,
              0,
              100
            );
            setIsLoading(false);
            onClose();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={visible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.ViewTitle}>
              <Text style={styles.txtTitle}>Recuperar Contraseña</Text>
            </View>
            <View style={styles.viewInputs}>
              <TextInput
                style={styles.inputText}
                placeholder="Correo"
                onChangeText={(text) => setEmail({ email: text })}
              ></TextInput>
            </View>
            <View style={styles.viewBtns}>
              <TouchableOpacity
                style={styles.btnClose}
                onPress={() => onClose()}
              >
                <Text style={styles.textButton}>Cerrar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.btnSave}
                onPress={recoveryPassword}
              >
                <Text style={styles.textButton}>Recuperar</Text>
                <ActivityIndicator
                  size="small"
                  color="#fff"
                  animating={isLoading}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(220, 225, 226 ,0.7)",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 5,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 30,
    width: windowWidth * 0.9,
  },
  ViewTitle: {
    alignItems: "center",
    justifyContent: "center",
    maxWidth: windowWidth,
  },
  txtTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  viewInputs: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 40,
  },
  inputText: {
    width: windowWidth * 0.75,
    height: windowHeight * 0.075,
    borderRadius: 20,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
  },
  viewBtns: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    justifyContent: "space-between",
  },
  btnClose: {
    alignItems: "center",
    justifyContent: "center",
    width: windowWidth * 0.3,
    height: windowHeight * 0.05,
    borderRadius: 50,
    backgroundColor: "red",
  },
  btnSave: {
    alignItems: "center",
    justifyContent: "center",
    width: windowWidth * 0.3,
    height: windowHeight * 0.05,
    borderRadius: 50,
    backgroundColor: "#000000",
    flexDirection: 'row',
  },
  textButton: {
    color: "#ffffff",
    marginRight: windowWidth * 0.02
  },
});
