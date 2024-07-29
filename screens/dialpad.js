// screens/DialerScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  Pressable,
  Dimensions,
} from "react-native";
import call from "react-native-phone-call";
import { Ionicons } from "@expo/vector-icons";
import { globalColors } from "../constants/styles";
// import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";

function DialerScreen() {
  const [phoneNumber, setPhoneNumber] = useState("");

  const deviceHeight = Dimensions.get("window").height;

  const handleCall = async () => {
    const args = {
      number: phoneNumber,
      prompt: false,
      skipCanOpen: true,
    };
    call(args).catch(console.error);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter a phone number</Text>
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        placeholderTextColor="#f9eaea"
      />
      {/* <Button title="Call" onPress={handleCall} /> */}
      <Pressable android_ripple={{ color: "#033303" }} onPress={handleCall}>
        <View style={{ ...styles.callButton, borderRadius: deviceHeight / 2 }}>
          <Ionicons name="call" size={32} color="white" />
        </View>
      </Pressable>
    </View>
  );
}

export default DialerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: globalColors.dark,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    color: "white",
  },
  input: {
    width: "85%",
    height: 50,
    backgroundColor: "#534f4f",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 30,
    color: "white",
    borderRadius: 20,
    marginHorizontal: 40,
    padding: 10,
  },

  callButton: {
    padding: 20,
    backgroundColor: "green",
  },
});
