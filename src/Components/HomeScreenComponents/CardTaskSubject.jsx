import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from "react-native";
  import React, { useCallback, useState } from "react";
  import { windowHeight, windowWidth } from "../../Utils/Constants";
  
  export default function CardTaskSubject() {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.ViewButton}>
            <ScrollView
              horizontal={true}
              style={{ paddingBottom: windowHeight * 0.03 }}
            >
              <TouchableOpacity
                style={[styles.buttonCard, { backgroundColor: "#6bb38e" }]}
              >
                <Text style={styles.textCategory}>Calculo</Text>
                <Text style={styles.textAmount}>
                  N° Tareas:5
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.buttonCard, { backgroundColor: "#a4c972" }]}
              >
                <Text style={styles.textCategory}>Programacion</Text>
                <Text style={styles.textAmount}>
                  N° Tareas: 4
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.buttonCard, { backgroundColor: "#ffb43e" }]}
              >
                <Text style={styles.textCategory}>Transmision</Text>
                <Text style={styles.textAmount}>
                  N° Tareas: 5
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.buttonCard, { backgroundColor: "#df5d2e" }]}
              >
                <Text style={styles.textCategory}>Simulación</Text>
                <Text style={styles.textAmount}>
                  N° Tareas: 5
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.buttonCard, { backgroundColor: "#21a3a3" }]}
              >
                <Text style={styles.textCategory}>Software I</Text>
                <Text style={styles.textAmount}>
                  N° Tareas: 5
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.buttonCard, { backgroundColor: "#7375a5" }]}
              >
                <Text style={styles.textCategory}>Matematicas</Text>
                <Text style={styles.textAmount}>
                  N° Tareas: 5
                </Text>
              </TouchableOpacity>
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
      color: "#fff",
      marginBottom: 10,
      paddingTop: 10,
    },
    textAmount: {
      fontSize: windowWidth * 0.035,
      color: "#fff",
      marginBottom: 10,
      paddingTop: 5,
    },
  });
  