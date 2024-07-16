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

export default function CardTaskSubject() {
  const URLAPI = process.env.EXPO_PUBLIC_API_URL;
  const [subjects, setSubjects] = useState([]);

  useFocusEffect(
    useCallback(() => {
      getSubjects();
    }, [])
  );

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

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.ViewButton}>
          <ScrollView
            horizontal={true}
            style={{ paddingBottom: windowHeight * 0.03 }}
          >
            {subjects.map((subject, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.buttonCard, { backgroundColor: subject.color }]}
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
});
