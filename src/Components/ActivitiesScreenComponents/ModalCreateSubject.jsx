import {
  ActivityIndicator,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import "core-js/stable/atob";
import React, { useState } from "react";
import { colors, windowHeight, windowWidth } from "../../Utils/Constants";
import ColorPalette from "react-native-color-palette";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

export default function ModalCreateSubject({ visible, onClose }) {
  const URLAPI = process.env.EXPO_PUBLIC_API_URL;
  const [isLoading, setIsLoading] = useState(false);
  const [nameSubject, setNameSubject] = useState("");
  const [selectedColor, setSelectedColor] = useState("#ffffff");

  const handleCreateSubject = async () => {
    try {
      const Token = await AsyncStorage.getItem("Token");
      if (Token) {
        setIsLoading(true);
        const decode = jwtDecode(Token);

        const subject = {
          name: nameSubject,
          color: selectedColor,
        };

        axios
          .post(`${URLAPI}/subject/saveSubject/${decode.id}`, subject, {
            headers: {
              Authorization: `${Token}`,
            },
          })
          .then((response) => {
            setIsLoading(false);
            setNameSubject("");
            setSelectedColor("#ffffff");
            onClose();
          })
          .catch((error) => {
            console.log(error);
            setIsLoading(false);
          });
      } else {
        console.log("Token no encontrado");
      }
    } catch (error) {
      console.error("Error al manejar el token:", error);
      setIsLoading(false);
    }
  };

  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={visible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.ViewTitle}>
              <Text style={styles.txtTitle}>Crear Materia</Text>
            </View>
            <View style={styles.viewInputs}>
              <TextInput
                style={styles.inputText}
                placeholder="Nombre materia"
                value={nameSubject}
                onChangeText={(text) => setNameSubject(text)}
              />
              <ColorPalette
                onChange={(color) => setSelectedColor(color)}
                defaultColor={"#FFFFFF"}
                colors={colors}
                title={"Selecciona un color"}
                icon={<Text>✔</Text>}
              />
            </View>
            <View style={styles.viewBtns}>
              <TouchableOpacity
                style={styles.btnClose}
                onPress={onClose}
                disabled={isLoading}
              >
                <Text style={styles.textButton}>Cerrar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.btnSave}
                onPress={handleCreateSubject}
                disabled={isLoading}
              >
                <Text style={styles.textButton}>Guardar</Text>
                {isLoading && (
                  <ActivityIndicator
                    size="small"
                    color="#fff"
                    animating={isLoading}
                  />
                )}
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
    paddingTop: windowHeight * 0.02,
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
    backgroundColor: "#D4233B",
  },
  btnSave: {
    alignItems: "center",
    justifyContent: "center",
    width: windowWidth * 0.3,
    height: windowHeight * 0.05,
    borderRadius: 50,
    backgroundColor: "#028F49",
    flexDirection: "row",
  },
  textButton: {
    color: "#ffffff",
    marginRight: windowWidth * 0.02,
  },
});
