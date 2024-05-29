import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { windowHeight, windowWidth } from "../../Utils/Constants";

export default function StatusTasks({ onProgress, onPending, onCompleted }) {
  const [buttonSelected, setButtonSelected] = useState("progress");

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.ViewButton}>
          <TouchableOpacity
            style={[
              styles.button,
              buttonSelected === "progress" && { backgroundColor: "#fa1" },
            ]}
            onPress={() => {
              setButtonSelected("progress");
              onProgress();
            }}
          >
            <Text style={styles.text}>En Progreso</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.ViewButton}>
          <TouchableOpacity
            style={[
              styles.button,
              buttonSelected === "pending" && { backgroundColor: "#ff3030" },
            ]}
            onPress={() => {
              setButtonSelected("pending");
              onPending();
            }}
          >
            <Text style={styles.text}>Pendientes</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.ViewButton}>
          <TouchableOpacity
            style={[
              styles.button,
              buttonSelected === "completed" && { backgroundColor: "#0a837f" },
            ]}
            onPress={() => {
              setButtonSelected("completed");
              onCompleted();
            }}
          >
            <Text style={styles.text}>Finalizadas</Text>
          </TouchableOpacity>
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
    marginLeft: 7,
  },
  text: {
    fontSize: windowWidth * 0.035,
    color: "#000",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#fff",
    width: windowWidth * 0.28,
    height: windowHeight * 0.05,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
});