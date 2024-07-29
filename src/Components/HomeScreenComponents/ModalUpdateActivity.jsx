import React, { useEffect, useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import RNPickerSelect from "react-native-picker-select";
import moment from "moment";
import { windowHeight, windowWidth } from "../../Utils/Constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function ModalUpdateActivity({ visible, onClose, activity }) {
  const URLAPI = process.env.EXPO_PUBLIC_API_URL;
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [name, setName] = useState("");
  const [percent, setPercent] = useState("");
  const [qualification, setQualification] = useState("");
  const [state, setState] = useState("");
  const [dateEntry, setDateEntry] = useState("");
  const [initialDateEntry, setInitialDateEntry] = useState("");

  useEffect(() => {
    if (activity) {
      setName(activity.name || "");
      setPercent(activity.percent || "");
      setQualification(activity.qualification || "");
      setState(activity.state || "");
      const formattedDate = activity.dateEntry.split("T")[0] || "";
      setDateEntry(formattedDate);
      setInitialDateEntry(formattedDate);
    }
  }, [activity]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return moment(dateString).format("YYYY-MM-DD");
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDateEntry(initialDateEntry);
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const formattedDate = formatDate(date);
    setDateEntry(formattedDate);
    setDatePickerVisibility(false);
  };

  const updateActivity = async () => {
    try {
      const Token = await AsyncStorage.getItem("Token");
      if (Token) {
        const activityToUpdate = {
          name: name,
          percent: percent,
          qualification: qualification,
          state: state,
          dateEntry: dateEntry,
        };
        axios
          .put(
            `${URLAPI}/activity/updateActivity/${activity._id}`,
            activityToUpdate,
            {
              headers: {
                Authorization: Token,
              },
            }
          )
          .then((response) => {
            console.log(response.data);
            if (response.data.status === true) {
              onClose();
            }
          })
          .catch((error) => {
            ToastAndroid.showWithGravityAndOffset(
              "No se pudo actualizar",
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
              0,
              100
            );
          });
      }
    } catch (error) {
      console.log(error, "No se pudo obtener el token");
    }
  };

  return (
    <View>
      <Modal animationType="fade" transparent={true} visible={visible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Name"
            />
            <TextInput
              style={styles.input}
              value={String(percent)}
              onChangeText={(text) => setPercent(Number(text))}
              keyboardType="numeric"
              placeholder="Porcentaje"
            />
            <TextInput
              style={styles.input}
              value={String(qualification)}
              onChangeText={(text) => setQualification(Number(text))}
              keyboardType="numeric"
              placeholder="Calificación"
            />
            <View style={styles.input}>
              <RNPickerSelect
                value={state}
                onValueChange={(value) => setState(value)}
                items={[
                  { label: "Pendiente", value: "pending" },
                  { label: "En progreso", value: "progress" },
                  { label: "Finalizada", value: "completed" },
                ]}
                style={{ placeholder: { color: "#000000" } }}
                placeholder={{ label: "Seleccione", value: state }}
              />
            </View>

            <TouchableOpacity style={styles.input} onPress={showDatePicker}>
              <Text>{dateEntry || "Seleccione Fecha"}</Text>
            </TouchableOpacity>
            <DateTimePicker
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
              minimumDate={new Date()}
            />
            <View style={styles.viewBtns}>
              <TouchableOpacity style={styles.btnClose} onPress={onClose}>
                <Text style={styles.textButton}>Cerrar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnSave} onPress={updateActivity}>
                <Text style={styles.textButton}>Actualizar</Text>
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
    width: windowWidth * 0.3,
    height: windowHeight * 0.05,
    borderRadius: 50,
    backgroundColor: "#D4233B",
    marginRight: 5,
  },
  btnSave: {
    alignItems: "center",
    justifyContent: "center",
    width: windowWidth * 0.3,
    height: windowHeight * 0.05,
    borderRadius: 50,
    backgroundColor: "#028F49",
    flexDirection: "row",
    marginLeft: 5,
  },
  textButton: {
    color: "white",
    fontWeight: "bold",
  },
  viewBtns: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});
