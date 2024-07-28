import { View, StyleSheet } from "react-native";
import ContactForm from "../components/edit_add_form";
import { globalColors } from "../constants/styles";

function UpdateCreateContact({ route }) {
  const contact = route.params ? route.params.contact : null;
  const isEdit = route.params ? route.params.isEdit : false;

  return (
    <View style={styles.screen}>
      <ContactForm contact={contact} isEdit={isEdit} />
    </View>
  );
}

export default UpdateCreateContact;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: globalColors.dark,
  },
});
