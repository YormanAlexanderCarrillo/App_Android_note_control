import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { windowHeight, windowWidth } from "../../Utils/Constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function ModalUpdateData({ visible, onClose, userData }) {
  const URLAPI = process.env.EXPO_PUBLIC_API_URL;
  const [id, setId] = useState();
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [carrier, setCarrier] = useState("");
  const [phone, setPhone] = useState();

  useEffect(() => {
    if (userData) {
      setId(userData._id);
      setName(userData.name || "");
      setLastName(userData.lastname || "");
      setEmail(userData.email || "");
      setCarrier(userData.carrier || "");
      setPhone(userData.phone || "");
    }
  }, [userData]);

  const updateData = async () => {
    try {
      const Token = await AsyncStorage.getItem("Token");

      if (Token) {
        const DataUpdateUser = {
          name: name,
          lastname: lastName,
          email: email,
          carrier: carrier,
          phone: phone,
        };
        axios
          .put(`${URLAPI}/user/updateUser/${id}`, DataUpdateUser, {
            headers: {
              Authorization: `${Token}`,
            },
          })
          .then((response) => {
            console.log(response.data);
            if (response.data.status === true) {
              onClose();
              ToastAndroid.showWithGravityAndOffset(
                "Datos actualizados",
                ToastAndroid.SHORT,
                ToastAndroid.TOP,
                0,
                100
              );
            } else {
              ToastAndroid.showWithGravityAndOffset(
                "No se pudo actualizar los datos",
                ToastAndroid.SHORT,
                ToastAndroid.TOP,
                0,
                100
              );
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Nombre"
            />
            <TextInput
              style={styles.input}
              value={lastName}
              onChangeText={(text) => setLastName(text)}
              placeholder="Apellido"
            />
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={(text) => setEmail(text)}
              keyboardType="email-address"
              placeholder="Correo"
            />

            <TextInput
              style={styles.input}
              value={carrier}
              onChangeText={(text) => setCarrier(text)}
              placeholder="Carrera"
            />

            <TextInput
              style={styles.input}
              value={String(phone)}
              onChangeText={(text) => setPhone(Number(text))}
              keyboardType="numeric"
              placeholder="Telefono"
            />

            <View style={styles.viewBtns}>
              <TouchableOpacity style={styles.btnClose} onPress={onClose}>
                <Text style={styles.textButton}>
                  <AntDesign name="closecircleo" size={40} color="black" />
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnSave} onPress={updateData}>
                <Text style={styles.textButton}>
                  <AntDesign name="checkcircleo" size={40} color="black" />
                </Text>
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: windowWidth * 0.8,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    width: "100%",
    padding: 5,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  btnClose: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    backgroundColor: "#D4233B",
    marginRight: 30
  },
  btnSave: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    backgroundColor: "#028F49",
    flexDirection: "row",
    marginLeft: 30,
  },
  textButton: {
    color: "white",
    fontWeight: "bold",
  },
  viewBtns: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    
  },
});
