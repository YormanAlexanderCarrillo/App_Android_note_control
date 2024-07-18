import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import "core-js/stable/atob";
import React, { useCallback, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { windowHeight, windowWidth } from "../../Utils/Constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";

export default function TaskCompleted() {
  const URLAPI = process.env.EXPO_PUBLIC_API_URL;
  const [activityCompleted, setActivityCompleted] = useState([]);

  useFocusEffect(
    useCallback(()=>{
      getActivityCompleted()
    },[])
  )

  const getActivityCompleted = async () => {
    try {
      const Token = await AsyncStorage.getItem("Token");

      if (Token) {
        const decode = jwtDecode(Token);
        axios
          .get(`${URLAPI}/activity/getActivitysUser/${decode.id}/completed`, {
            headers: {
              Authorization: Token,
            },
          })
          .then((response) => {
            setActivityCompleted(response.data.data);
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
        <Text style={styles.text}>Tareas Completas</Text>
      </View>
      <ScrollView>
        {activityCompleted.length === 0 ? (
          <View style={styles.noActivitiesContainer}>
            <Text style={styles.noActivitiesText}>
              No hay tareas Finalizadas
            </Text>
          </View>
        ) : (
          activityCompleted.map((activity, index) => (
            <View style={styles.ViewBtns} key={index}>
              <TouchableOpacity style={styles.buttonTask}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View style={{ paddingRight: 20 }}>
                    <Ionicons
                      name="checkmark-done-circle-outline"
                      size={24}
                      color="#0a837f"
                    />
                  </View>

                  <View>
                    <Text style={styles.textNameTaskBtns}>{activity.name}</Text>
                    <Text style={styles.textDateEntry}>
                      Fecha entrega: {activity.dateEntry.split("T")[0]}
                    </Text>
                    <Text style={styles.textState}>Estado: Completa</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
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
    paddingTop: 20,
  },
  buttonTask: {
    width: windowWidth * 0.85,
    height: windowHeight * 0.075,
    borderRadius: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 10,
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
    color: "#0a837f",
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
