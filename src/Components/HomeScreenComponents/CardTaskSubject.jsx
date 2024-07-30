import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { windowHeight, windowWidth } from "../../Utils/Constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import ModalTasksSubject from "./ModalTasksSubject";

export default function CardTaskSubject() {
  const URLAPI = process.env.EXPO_PUBLIC_API_URL;
  const [subjects, setSubjects] = useState([]);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [idSubjectSelected, setSubjectsSelected] = useState();
  const [tasks, setTasks] = useState([]);

  useFocusEffect(
    useCallback(() => {
      getSubjects();
    }, [isVisibleModal])
  );

  useEffect(() => {
    if (idSubjectSelected) {
      getTasks();
    }
  }, [idSubjectSelected, isVisibleModal]);

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
          setSubjects(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const getTasks = async () => {
    try {
      const Token = await AsyncStorage.getItem("Token");
      if (Token) {
        axios
          .get(`${URLAPI}/activity/getActivitysSubject/${idSubjectSelected}`, {
            headers: {
              Authorization: `${Token}`,
            },
          })
          .then((response) => {
            setTasks(response.data.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  function openModal(id_subjects) {
    setSubjectsSelected(id_subjects);
    setIsVisibleModal(true);
  }

  const handleCloseModal = () => {
    setTasks([]);
    setIsVisibleModal(false);
  };

  return (
    <View style={styles.container}>
      {subjects.length == 0 ? (
        <View style={styles.noSubjectsContainer}>
          <Text style={styles.noSubjectText}>No hay asignaturas creadas</Text>
        </View>
      ) : (
        <View style={styles.row}>
          <View style={styles.ViewButton}>
            <ScrollView
              horizontal={true}
              style={{ paddingBottom: windowHeight * 0.03 }}
            >
              {subjects.map((subject, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.buttonCard,
                    { backgroundColor: subject.color },
                  ]}
                  onPress={() => openModal(subject._id)}
                >
                  <Text style={styles.textCategory}>{subject.name}</Text>
                  <Text
                    style={styles.textAmount}
                  >{`N° Tareas: ${subject.activities.length}`}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      )}

      <ModalTasksSubject
        visible={isVisibleModal}
        onClose={handleCloseModal}
        tasks={tasks}
        setTasks={setTasks}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: windowWidth,
  },
  row: {
    flexDirection: "row",
    paddingLeft: 20,
  },
  ViewButton: {
    paddingTop: 10,
    marginLeft: 7,
  },
  text: {
    fontSize: windowWidth * 0.035,
    color: "#076461",
    textAlign: "center",
  },
  buttonCard: {
    width: windowWidth * 0.4,
    height: windowHeight * 0.1,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 15,
    backgroundColor: "#0a837f",
    alignItems: "center",
    justifyContent: "center",
  },
  textCategory: {
    fontSize: windowWidth * 0.04,
    color: "#000000",
    marginBottom: 10,
    paddingTop: 10,
  },
  textAmount: {
    fontSize: windowWidth * 0.035,
    color: "#000000",
    marginBottom: 10,
    paddingTop: 5,
  },
  noSubjectsContainer: {
    alignItems: "center",
    marginTop: windowHeight * 0.06,
  },
  noSubjectText: {
    fontSize: windowWidth * 0.05,
    color: "#000",
  },
});
