import { View, FlatList } from "react-native";
import ContactCard from "./contactCard";

function ContactList({ items }) {
  function renderItemHandler(itemData) {
    const contacts = itemData.item;
    const contactData = {
      id: contacts.id,
      name: contacts.name,
      company: contacts.company,
      gender: contacts.gender,
      email: contacts.email,
      phone: contacts.phone,
      imageUri: contacts.imageUri,
    };

    return <ContactCard {...contactData} />;
  }

  return (
    <View>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderItemHandler}
      />
    </View>
  );
}

export default ContactList;
