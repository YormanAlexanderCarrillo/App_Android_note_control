import React, { useCallback, useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import camara from "../../../assets/camara.png"
import { windowHeight, windowWidth } from "../../Utils/Constants";

export default function Header() {

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <View style={{ width: windowWidth * 0.6, justifyContent: "center" }}>
          <Text style={styles.texMessage}>Excelente dia!!</Text>
        </View>

        <Image
          source={camara}
          style={styles.image}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    width: windowWidth * 0.99,
    justifyContent: "center",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  textName: {
    fontSize: windowWidth * 0.06,
    fontWeight: "bold",
    color: "#000",
  },
  texMessage: {
    fontSize: windowWidth * 0.04,
    color: "#000",
  },
  image: {
    width: windowWidth * 0.2,
    height: windowHeight * 0.1,
    borderRadius: 50,
  },
});
