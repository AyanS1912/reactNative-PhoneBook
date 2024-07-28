import { StyleSheet, Text, TextInput, View } from "react-native";
import { globalColors } from "../constants/styles";

function Input({ label, textInputConfig }) {
  // const inputStyles = [styles.input];

  return (
    <View style={[styles.inputContainer]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={styles.input} {...textInputConfig} />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 8,
    marginVertical: 8,
    backgroundColor: globalColors.primaryColor,
    borderRadius: 20,
  },
  label: {
    fontSize: 12,
    color: "#888282",
    paddingLeft: 15,
    paddingTop: 15,
    marginBottom: 4,
  },
  input: {
    color: "white",
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    paddingLeft: 15,
  },
});
