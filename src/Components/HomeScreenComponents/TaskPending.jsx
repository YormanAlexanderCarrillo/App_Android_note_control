import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import "core-js/stable/atob";
import React, { useState, useCallback } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { windowHeight, windowWidth } from "../../Utils/Constants";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { jwtDecode } from "jwt-decode";
import ModalUpdateActivity from "./ModalUpdateActivity";

export default function TaskPending() {
  const URLAPI = process.env.EXPO_PUBLIC_API_URL;
  const [activityPending, setActivityPending] = useState([]);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState()

  useFocusEffect(
    useCallback(() => {
      getTaskPending();
    }, [isVisibleModal])
  );

  const showModal = (activity) => {
    setSelectedActivity(activity)
    setIsVisibleModal(true);
  };

  const handleCloseModal = () => {
    setIsVisibleModal(false);
  };

  const getTaskPending = async () => {
    try {
      const Token = await AsyncStorage.getItem("Token");
      if (Token) {
        const decode = jwtDecode(Token);
        axios
          .get(`${URLAPI}/activity/getActivitysUser/${decode.id}/pending`, {
            headers: {
              Authorization: Token,
            },
          })
          .then((response) => {
            setActivityPending(response.data.data);
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
    <View style={styles.container}>
      <View style={styles.viewText}>
        <Text style={styles.text}>Tareas Pendientes</Text>
      </View>
      <ScrollView>
        {activityPending.length === 0 ? (
          <View style={styles.noActivitiesContainer}>
            <Text style={styles.noActivitiesText}>
              No hay tareas pendientes
            </Text>
          </View>
        ) : (
          activityPending.map((activity, index) => (
            <View style={styles.ViewBtns} key={index}>
              <TouchableOpacity style={styles.buttonTask} onPress={()=> showModal(activity)}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View style={{ paddingRight: 20 }}>
                    <FontAwesome
                      name="exclamation-circle"
                      size={24}
                      color="#ff3030"
                    />
                  </View>

                  <View>
                    <Text style={styles.textNameTaskBtns}>{activity.name}</Text>
                    <Text style={styles.textDateEntry}>
                      Fecha entrega: {activity.dateEntry.split("T")[0]}
                    </Text>
                    <Text style={styles.textState}>Estado: Pendiente</Text>
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
  textDateEntry: {
    color: "#0579A1",
    fontSize: 13,
  },
  textState: {
    color: "#ff3030",
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
