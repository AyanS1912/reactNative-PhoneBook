import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";

function IconButton({ icon, color, size, onPressHandler }) {
  return (
    <Pressable
      onPress={onPressHandler}
      style={({ pressed }) => pressed && styles.buttonPressed}
    >
      <View style={styles.buttonContainer}>
        <Ionicons name={icon} color={color} size={size}></Ionicons>
      </View>
    </Pressable>
  );
}

export default IconButton;

const styles = StyleSheet.create({
  buttonContainer: {
    marginHorizontal: 10,
    padding: 12,
    borderRadius: 28,
  },
  buttonPressed: {
    opacity: 0.5,
  },
});
