import { Text, View, StyleSheet } from "react-native";
import ContactList from "../components/contactsList";
import { useSelector } from "react-redux";
import { globalColors } from "../constants/styles";

function AllContacts() {
  const contacts = useSelector((state) => state.contacts.data);
  // const contacts = [];

  if (contacts.length === 0) {
    return (
      <View style={styles.emptyScreen}>
        <Text style={styles.emptyScreenText}>
          Click on add icon to add contact to you Contact list
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <ContactList items={contacts}></ContactList>
    </View>
  );
}

export default AllContacts;

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
