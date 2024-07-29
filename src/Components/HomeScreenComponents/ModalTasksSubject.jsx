import {
  Alert,
  BackHandler,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { windowHeight, windowWidth } from "../../Utils/Constants";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ModalTasksSubject({
  visible,
  onClose,
  tasks,
  setTasks,
}) {
  const URLAPI = process.env.EXPO_PUBLIC_API_URL;

  const handleDeleteTask = async (taskId) => {
    const Token = await AsyncStorage.getItem("Token");
    if (Token) {
      try {
        await axios.delete(`${URLAPI}/activity/deleteActivity/${taskId}`, {
          headers: {
            Authorization: `${Token}`,
          },
        });
        const updatedTasks = tasks.filter((task) => task._id !== taskId);
        setTasks(updatedTasks);
      } catch (error) {
        console.log(error);
        Alert.alert(
          "Error",
          "No se pudo eliminar la tarea. Inténtalo de nuevo."
        );
      }
    }
  };

  const confirmDeleteTask = (taskId) => {
    Alert.alert(
      "Eliminar tarea",
      "¿Estás seguro de que deseas eliminar esta tarea?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          onPress: () => handleDeleteTask(taskId),
          style: "default",
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View>
      <Modal
        animationType="fade"
        transparent={false}
        visible={visible}
        onRequestClose={onClose}
      >
        <View style={styles.container}>
          <ScrollView>
            {tasks.length === 0 ? (
              <View style={styles.noActivitiesContainer}>
                <Text style={styles.noActivitiesText}>No hay tareas</Text>
              </View>
            ) : (
              tasks.map((activity, index) => (
                <View style={styles.ViewBtns} key={index}>
                  <TouchableOpacity
                    style={styles.buttonTask}
                    onLongPress={() => confirmDeleteTask(activity._id)}
                  >
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <View style={{ paddingRight: 20 }}>
                        <FontAwesome5 name="tasks" size={24} color="#049ACE" />
                      </View>

                      <View>
                        <Text style={styles.textNameTaskBtns}>
                          {activity.name}
                        </Text>
                        <Text style={styles.textDateEntry}>
                          Fecha entrega: {activity.dateEntry.split("T")[0]}
                        </Text>
                        <Text style={styles.textState}>Estado: {activity.state}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              ))
            )}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  ViewBtns: {
    width: windowWidth,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
  },
  buttonTask: {
    width: windowWidth * 0.95,
    height: windowHeight * 0.075,
    borderRadius: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    paddingLeft: 10,
  },
  noActivitiesContainer: {
    width: windowWidth,
    height: windowHeight,
    alignItems: "center",
    justifyContent: "center",
  },
  noActivitiesText: {
    fontSize: 20,
    color: "#000000",
    fontWeight: "bold",
  },
});
