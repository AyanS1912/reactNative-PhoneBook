import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Pressable,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { FloatingAction } from "react-native-floating-action";
import { removeContact } from "../store/contacts";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Dialog from "react-native-dialog";
import { globalColors } from "../constants/styles";
import DetailHolder from "../components/detailHolder";

function ContactDetails({ route }) {
  const { id, name, company, email, gender, phone, imageUri } = route.params;
  // console.log("uri", imageUri);

  const [visible, setVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const contactId = id;
  const dispatch = useDispatch();
  const navigation = useNavigation();

  function deleteDetails() {
    dispatch(removeContact({ id }));
    navigation.goBack();
  }

  function confirmDelete() {
    setVisible(true);
  }

  function handleCancel() {
    setVisible(false);
  }

  function handleConfirm() {
    deleteDetails();
    setVisible(false);
  }

  function editDetails() {
    navigation.navigate("Add", {
      isEdit: true,
      contact: { id, name, company, email, gender, phone },
    });
  }

  const actions = [
    {
      text: "Edit",
      icon: require("../assets/edit.png"),
      name: "edit_bt",
      position: 2,
    },
    {
      text: "Delete",
      icon: require("../assets/delete.png"),
      name: "delete_bt",
      position: 1,
    },
  ];

  return (
    <View style={styles.container}>
      <View syle={styles.headerContainer}>
        <Pressable onPress={() => setIsModalVisible(true)}>
          <Image
            source={
              imageUri ? { uri: imageUri } : require("../assets/user.jpeg")
            }
            style={styles.imageContainer}
          />
        </Pressable>
        <Text style={styles.headerText}>Contact Details</Text>
      </View>
      <View style={styles.detailContainer}>
        <DetailHolder label="Name" value={name} />
        <DetailHolder label="Company" value={company} />
        <DetailHolder label="Email" value={email} />
        <DetailHolder label="Gender" value={gender} />
        <DetailHolder label="Phone" value={phone} />
      </View>

      <View style={styles.floatcontainer}>
        <Text style={styles.container}>Actions</Text>
        <FloatingAction
          actions={actions}
          onPressItem={(name) => {
            if (name === "edit_bt") {
              editDetails(contactId);
            }

            if (name === "delete_bt") {
              confirmDelete();
            }
          }}
          overlayColor="rgba(0, 0, 0, 0)"
        />
      </View>

      <Dialog.Container visible={visible}>
        <Dialog.Title>Delete Contact</Dialog.Title>
        <Dialog.Description>
          Are you sure you want to delete this contact?
        </Dialog.Description>
        <Dialog.Button label="Cancel" onPress={handleCancel} />
        <Dialog.Button label="Delete" onPress={handleConfirm} />
      </Dialog.Container>

      <Modal visible={isModalVisible} transparent={true}>
        <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
          <View style={styles.modalContainer}>
            <Pressable onPress={() => setIsModalVisible(false)}>
              <Image
                source={
                  imageUri ? { uri: imageUri } : require("../assets/user.jpeg")
                }
                style={styles.magnifiedImage}
              />
            </Pressable>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

export default ContactDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: globalColors.dark,
  },
  text: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 10,
  },

  actionsText: {
    color: "white",
  },

  floatcontainer: {
    backgroundColor: globalColors.dark,
    flex: 1,
  },

  headerContainer: {
    flex: 1,
  },

  headerText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },

  detailContainer: {
    backgroundColor: globalColors.primaryColor,
    flex: 3,
    borderRadius: 50,
    paddingVertical: 20,
    paddingHorizontal: 30,
    marginVertical: 5,
  },

  label: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 10,
  },
  separator: {
    marginVertical: 10,
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    alignSelf: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  magnifiedImage: {
    height: 300,
    width: 300,
    borderRadius: 150,
  },
});
