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
import { colors, windowHeight, windowWidth } from "../../Utils/Constants";
import ColorPalette from "react-native-color-palette";

export default function ModalCreateSubject({ visible, onClose }) {
  const [isLoading, setIsLoading] = useState(false);
  const [nameSubject, setNameSubject] = useState();
  const [selectedColor, setSelectedColor] = useState("#ffffff");
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
                onChangeText={(text) => setNameSubject(text)}
              ></TextInput>
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
                onPress={() => onClose()}
              >
                <Text style={styles.textButton}>Cerrar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.btnSave}>
                <Text style={styles.textButton}>Guardar</Text>
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
    backgroundColor: "red",
  },
  btnSave: {
    alignItems: "center",
    justifyContent: "center",
    width: windowWidth * 0.3,
    height: windowHeight * 0.05,
    borderRadius: 50,
    backgroundColor: "#0050d7",
    flexDirection: "row",
  },
  textButton: {
    color: "#ffffff",
    marginRight: windowWidth * 0.02,
  },
});
