import { View, Text, StyleSheet } from "react-native";
import { globalColors } from "../constants/styles";

function DetailHolder({ label, value }) {
  // console.log(label, value);
  return (
    <View style={styles.detailBox}>
      <Text style={styles.labelBox}>{label}</Text>
      <Text style={styles.valueBox}> {value}</Text>
    </View>
  );
}

export default DetailHolder;

const styles = StyleSheet.create({
  detailBox: {
    backgroundColor: "#2a2828",
    flex: 1,
    marginBottom: 15,
    padding: 10,
    borderRadius: 20,
    paddingLeft: 10,
  },
  labelBox: {
    color: globalColors.clickColor,
    fontSize: 11,
  },
  valueBox: {
    color: globalColors.clickColor,
    fontSize: 15,
  },
});
