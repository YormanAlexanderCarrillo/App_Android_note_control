import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import "core-js/stable/atob";
import React, { useCallback, useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { windowHeight, windowWidth } from "../../Utils/Constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import ModalUpdateActivity from "./ModalUpdateActivity";

export default function TaskInProgress() {
  const URLAPI = process.env.EXPO_PUBLIC_API_URL;
  const [activityProgress, setActivityProgress] = useState([]);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState()

  useFocusEffect(
    useCallback(() => {
      getActivityProgress();
    }, [isVisibleModal])
  );

  const showModal = (activity) => {
    setSelectedActivity(activity)
    setIsVisibleModal(true);
  };

  const handleCloseModal = () => {
    setIsVisibleModal(false);
  };


  const getActivityProgress = async () => {
    try {
      const Token = await AsyncStorage.getItem("Token");
      if (Token) {
        const decode = jwtDecode(Token);
        axios
          .get(`${URLAPI}/activity/getActivitysUser/${decode.id}/progress`, {
            headers: {
              Authorization: Token,
            },
          })
          .then((Response) => {
            setActivityProgress(Response.data.data);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        console.log("No se pudo recuperar el token");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.viewText}>
        <Text style={styles.text}>Tareas en progreso</Text>
      </View>
      <ScrollView>
        {activityProgress.length === 0 ? (
          <View style={styles.noActivitiesContainer}>
            <Text style={styles.noActivitiesText}>
              No hay tareas en progreso
            </Text>
          </View>
        ) : (
          activityProgress.map((activity, index) => (
            <View style={styles.ViewBtns} key={index}>
              <TouchableOpacity style={styles.buttonTask} onPress={()=> showModal(activity)}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View style={{ paddingRight: 20 }}>
                    <MaterialCommunityIcons
                      name="progress-clock"
                      size={24}
                      color="#ffbc11"
                    />
                  </View>

                  <View>
                    <Text style={styles.textNameTaskBtns}>{activity.name}</Text>
                    <Text style={styles.textDateEntry}>
                      Fecha entrega: {activity.dateEntry.split("T")[0]}
                    </Text>
                    <Text style={styles.textState}>Estado: En progreso</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
      <ModalUpdateActivity activity={selectedActivity} visible={isVisibleModal} onClose={handleCloseModal}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: windowWidth,
  },
  viewText: {
    paddingLeft: 30,
  },
  text: {
    fontSize: windowWidth * 0.06,
    color: "#000",
  },
  ViewBtns: {
    width: windowWidth,
    paddingLeft: 30,
    paddingTop: 10,
  },
  buttonTask: {
    width: windowWidth * 0.85,
    height: windowHeight * 0.075,
    borderRadius: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    paddingLeft: 10,
  },
  textNameTaskBtns: {
    fontSize: windowWidth * 0.04,
    color: "#000",
    fontWeight: "bold",
  },
  textNameTaskBtns: {
    fontSize: windowWidth * 0.04,
    color: "#000",
    fontWeight: "bold",
  },
  textDateEntry: {
    color: "#0579A1",
    fontSize: 13,
  },
  textState: {
    color: "#fa1",
    fontSize: 13,
  },
  noActivitiesContainer: {
    alignItems: "center",
    marginTop: windowHeight * 0.2,
  },
  noActivitiesText: {
    fontSize: windowWidth * 0.05,
    color: "#000",
  },
});
