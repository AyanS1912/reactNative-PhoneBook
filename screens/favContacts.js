import { Text, View, StyleSheet } from "react-native";
import ContactList from "../components/contactsList";

import { useSelector } from "react-redux";
import { globalColors } from "../constants/styles";

function FavContact() {
  let contactsList = useSelector((state) => state.contacts.data);
  const favContactsIds = useSelector((state) => state.favoriteContact.ids);

  const favContactsList = contactsList.filter((contact) =>
    favContactsIds.includes(contact.id)
  );
  if (favContactsList.length === 0) {
    return (
      <View style={styles.emptyScreen}>
        <Text style={styles.emptyScreenText}>
          Click on star icon to add contact to you favorite list
        </Text>
      </View>
    );
  }
  return (
    <View style={styles.screen}>
      <ContactList items={favContactsList}></ContactList>
    </View>
  );
}

export default FavContact;

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
