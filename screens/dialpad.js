// screens/DialerScreen.js
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { globalColors } from "../constants/styles";

function DialerScreen() {
  return <View style={styles.screen}></View>;
}

export default DialerScreen;

const styles = StyleSheet.create({
  emptyScreen: {
    backgroundColor: globalColors.dark,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyScreenText: {
    fontWeight: "bold",
    fontSize: 15,
    color: globalColors.clickColor,
  },
  screen: {
    flex: 1,
    backgroundColor: "#000",
  },
});
