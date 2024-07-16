import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import "core-js/stable/atob";
import React, { useEffect, useState } from "react";
import { windowHeight, windowWidth } from "../../Utils/Constants";
import ModalCreateSubject from "./ModalCreateSubject";
import DateTimePicker from "react-native-modal-datetime-picker";
import RNPickerSelect from "react-native-picker-select";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export default function FormCreateActivities() {
  const URLAPI = process.env.EXPO_PUBLIC_API_URL;
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [items, setItems] = useState([]);
  const [isDatePickerVisible, setDatePicketVisible] = useState(false);
  const [selelectedSubject, setSelectedSubject] = useState("");
  const [nameActivity, setNameActivity] = useState("");
  const [date, setDate] = useState("");
  const [percentage, setPercentage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const estados = [
    { label: "Pendiente", value: "Pending" },
    { label: "En Progreso", value: "In progress" },
    { label: "Finalizada", value: "finished" },
  ];

  useEffect(() => {
    getSubjects();
  }, [isVisibleModal]);

  const getSubjects = async () => {
    const Token = await AsyncStorage.getItem("Token");
    if (Token) {
      const decode = jwtDecode(Token);
      axios
        .get(`${URLAPI}/subject/getSubjects/${decode.id}`, {
          headers: {
            Authorization: `${Token}`,
          },
        })
        .then((response) => {
          //console.log(response.data);
          const subjects = response.data.data;
          const formatterItems = subjects.map((subject) => ({
            label: subject.name,
            value: subject._id,
          }));

          setItems(formatterItems);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("No se pudo obtener el token");
    }
  };

  const createActivity = async () => {
    console.log(selelectedSubject);
    const Token = await AsyncStorage.getItem("Token");
    if (Token) {
      const activity = {
        name: nameActivity,
        dateEntry: date,
        percent: percentage,
      };
      setIsLoading(true)
      axios
        .post(
          `${URLAPI}/activity/saveActivity/${selelectedSubject}`,
          activity,
          {
            headers: {
              Authorization: `${Token}`,
            },
          }
        )
        .then((response) => {
          console.log("respuesta: ",response.data);
          if (response.data.status === true) {
            setSelectedSubject("");
            setNameActivity("");
            setDate("");
            setPercentage("");
            ToastAndroid.showWithGravityAndOffset(
              "Actividad creada",
              ToastAndroid.LONG,
              ToastAndroid.TOP,
              0,
              100
            );
            setIsLoading(false)
          }
        })
        .catch((error) => {
          console.log(error);
          ToastAndroid.showWithGravityAndOffset(
            "Ocurrio un error",
            ToastAndroid.LONG,
            ToastAndroid.TOP,
            0,
            100
          );
          setIsLoading(false)
        });
    }
  };

  const showModal = () => {
    setIsVisibleModal(true);
  };

  const handleCloseModal = () => {
    setIsVisibleModal(false);
  };

  const showDatePicker = () => {
    setDatePicketVisible(!isDatePickerVisible);
  };

  const handleConfirm = (selectDate) => {
    const selectedDate = new Date(selectDate);
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const day = String(selectedDate.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    setDate(formattedDate);
    onDateChange(formattedDate);
    showDatePicker();
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ paddingTop: windowHeight * 0.1 }}>
        <TouchableOpacity style={styles.btnCreateSubject} onPress={showModal}>
          <Text>Crear Asignatura</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.containerForm}>
        <View style={styles.InputText}>
          <RNPickerSelect
            onValueChange={(value) => setSelectedSubject(value)}
            items={items}
            placeholder={{
              label: "Seleccione una materia",
              value: null,
              color: "#B2B2B2",
            }}
            value={selelectedSubject}
            style={{ placeholder: { color: "#787878" } }}
          />
        </View>

        <TextInput
          style={styles.InputText}
          placeholder="Nombre Actividad"
          placeholderTextColor="#787878"
          onChangeText={(value) => setNameActivity(value)}
        >
          {nameActivity ? `${nameActivity}`: ""}
        </TextInput>

        <TouchableOpacity style={styles.InputText} onPress={showDatePicker}>
          <Text style={{ color: date ? "#000000" : "#787878" }}>
            {date ? `${date}` : `Seleccione Fecha Entrega`}
          </Text>
        </TouchableOpacity>

        <TextInput
          style={styles.InputText}
          inputMode="numeric"
          placeholder="Porcentaje Calificación"
          placeholderTextColor="#787878"
          onChangeText={(value) => setPercentage(value)}
        >
          {percentage ? `${percentage}`: ""}
        </TextInput>
        {/* <View style={styles.InputText}>
          <RNPickerSelect
            onValueChange={(value) => setSelectedStatus(value)}
            items={estados}
            placeholder={{
              label: "Estado actividad",
              value: null,
              color: "#B2B2B2",
            }}
            style={{ placeholder: { color: "#787878" } }}
          />
        </View> */}
        <TouchableOpacity style={styles.btnSave} onPress={createActivity}>
          <Text style={styles.textBtn}>Guardar</Text>
          <ActivityIndicator
            size="small"
            color="#ffffff"
            animating={isLoading}
          />
        </TouchableOpacity>
      </View>
      <ModalCreateSubject visible={isVisibleModal} onClose={handleCloseModal} />
      <DateTimePicker
        mode="date"
        isVisible={isDatePickerVisible}
        onConfirm={handleConfirm}
        onCancel={showDatePicker}
        minimumDate={new Date()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  btnCreateSubject: {
    alignItems: "center",
    backgroundColor: "#fa1",
    marginBottom: windowHeight * 0.03,
    marginRight: windowWidth * 0.1,
    marginLeft: windowHeight * 0.03,
    borderRadius: 20,
    height: windowHeight * 0.06,
    justifyContent: "center",
    flexDirection: "row",
    width: windowWidth * 0.3,
  },
  containerForm: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: windowHeight * 0.03,
  },
  InputText: {
    backgroundColor: "#ffffff",
    height: windowHeight * 0.08,
    marginTop: windowHeight * 0.02,
    width: windowWidth * 0.9,
    marginLeft: windowWidth * 0.1,
    marginRight: windowWidth * 0.1,
    borderRadius: 15,
    fontSize: 15,
    paddingLeft: 20,
    justifyContent: "center",
    borderColor: "#000000",
    borderWidth: 1,
  },
  btnSave: {
    alignItems: "center",
    backgroundColor: "#3494E9",
    marginTop: windowHeight * 0.08,
    marginBottom: windowHeight * 0.03,
    marginRight: windowWidth * 0.1,
    marginLeft: windowHeight * 0.03,
    borderRadius: 20,
    height: windowHeight * 0.06,
    width: windowWidth * 0.8,
    justifyContent: "center",
    flexDirection: "row",
  },
  textBtn: {
    color: "#ffffff",
    marginRight:15,
  },
  ButtonDate: {
    backgroundColor: "#fbf4ff",
    justifyContent: "center",
    alignItems: "center",
    width: windowWidth * 0.37,
    height: windowHeight * 0.06,
    marginBottom: 10,
    borderRadius: 20,
    marginRight: 10,
  },
});
