import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from "react-native";
  import React, { useCallback, useState } from "react";
  import { MaterialCommunityIcons } from "@expo/vector-icons";
  import { windowHeight, windowWidth } from "../../Utils/Constants";
  
  export default function TaskInProgress() {
   
  
    return (
      <View style={styles.container}>
        <View style={styles.viewText}>
          <Text style={styles.text}>Tareas en progreso</Text>
        </View>
        <ScrollView>
          <View style={styles.ViewBtns}>
           
              <TouchableOpacity
                style={styles.buttonTask}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View style={{ paddingRight: 20 }}>
                    <MaterialCommunityIcons
                      name="progress-clock"
                      size={24}
                      color="#ffbc11"
                    />
                  </View>
  
                  <View>
                    <Text style={styles.textNameTaskBtns}>Titulo tarea</Text>
                    <Text style={{ color: "#ffbc11", fontSize: 12 }}>
                      En progreso
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
          </View>
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
  });