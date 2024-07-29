import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, Alert, Pressable } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useDispatch } from "react-redux";
import { addContact, updateContact } from "../store/contacts";
import Input from "./inputHolder";
import { useNavigation } from "@react-navigation/native";
import Dialog from "react-native-dialog";
import uuid from "react-native-uuid";
import { createEntityAdapter } from "@reduxjs/toolkit";
import { globalColors } from "../constants/styles";

function ContactForm({ isEdit, contact }) {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [inputVal, setInputVal] = useState({
    id: contact?.id || "",
    name: contact?.name || "",
    company: contact?.company || "",
    email: contact?.email || "",
    gender: contact?.gender || "",
    phone: contact?.phone || "",
  });

  useEffect(() => {
    if (isEdit && contact) {
      setInputVal(contact);
    }
  }, [isEdit, contact]);

  function inputHandler(inputIdentifier, enteredValue) {
    setInputVal((currInput) => {
      return {
        ...currInput,
        [inputIdentifier]: enteredValue,
      };
    });
  }

  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  function validatePhoneNumber(phone) {
    const regex = /^\d{10}$/;
    return regex.test(phone);
  }

  function showConfirmDialog() {
    const { name, phone, email } = inputVal;
    if (!name.trim()) {
      Alert.alert("Invalid Input", "Name is required.");
      return;
    }
    if (name.trim().length <= 3) {
      Alert.alert("Invalid Input", "Name should be greater than 3 characters.");
      return;
    }
    if (!phone.trim()) {
      Alert.alert("Invalid Input", "Phone number is required.");
      return;
    }
    if (!validatePhoneNumber(phone)) {
      Alert.alert("Invalid Input", "Phone number should be exactly 10 digits.");
      return;
    }
    if (email && !validateEmail(email)) {
      Alert.alert("Invalid Input", "Please enter a valid email address.");
      return;
    }
    setVisible(true);
  }

  function handleCancel() {
    setVisible(false);
  }

  function handleConfirm() {
    setVisible(false);
    if (contact) {
      dispatch(updateContact(inputVal));
    } else {
      dispatch(addContact({ ...inputVal, id: uuid.v4() }));
    }
    navigation.navigate("My Contacts");
  }

  return (
    <View style={styles.form}>
      <Text style={styles.title}>
        {contact ? "Edit Contact" : "New Contact"}
      </Text>
      <View style={styles.inputsColumn}>
        <Input
          label="Name"
          textInputConfig={{
            keyboardType: "default",
            onChangeText: inputHandler.bind(this, "name"),
            value: inputVal.name,
          }}
        />
        <Input
          label="Company"
          textInputConfig={{
            keyboardType: "default",
            maxLength: 20,
            onChangeText: inputHandler.bind(this, "company"),
            value: inputVal.company,
          }}
        />
        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Gender</Text>
          <Picker
            selectedValue={inputVal.gender}
            style={styles.picker}
            onValueChange={inputHandler.bind(this, "gender")}
            dropdownIconColor="white"
          >
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />
          </Picker>
        </View>
        <Input
          label="Contact Number"
          textInputConfig={{
            keyboardType: "phone-pad",
            minLength: 10,
            maxLength: 10,
            onChangeText: inputHandler.bind(this, "phone"),
            value: inputVal.phone,
          }}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.pressable}
          android_ripple={{ color: "#fe0909" }}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </Pressable>
        {/* <View style={styles.buttonBox}>
          <Button title="Cancel" onPress={() => navigation.goBack()} />
        </View> */}
        {/* <View style={styles.buttonBox}>
          <Button
            title={contact ? "Update" : "Save"}
            onPress={showConfirmDialog}
          />
        </View> */}
        <Pressable
          style={styles.pressable}
          android_ripple={{ color: "#0000ff" }}
          onPress={showConfirmDialog}
        >
          <Text style={styles.buttonText}>{contact ? "Update" : "Save"}</Text>
        </Pressable>
      </View>
      <Dialog.Container visible={visible}>
        <Dialog.Title>
          {contact ? "Update Contact" : "Add Contact"}
        </Dialog.Title>
        <Dialog.Description>
          Are you sure you want to {contact ? "Update" : "Add"} this contact?
        </Dialog.Description>
        <Dialog.Button label="Cancel" onPress={handleCancel} />
        <Dialog.Button
          label={contact ? "Update" : "Save"}
          onPress={handleConfirm}
        />
      </Dialog.Container>
    </View>
  );
}

export default ContactForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    backgroundColor: "black",
    padding: 20,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  inputsColumn: {
    flexDirection: "column",
    justifyContent: "space-between",
  },

  rowInput: {
    flex: 1,
  },

  label: {
    fontSize: 12,
    color: "#888282",
    paddingLeft: 15,
    paddingTop: 15,
    marginBottom: 4,
  },

  pickerContainer: {
    marginHorizontal: 8,
    marginVertical: 8,
    backgroundColor: globalColors.primaryColor,
    borderRadius: 20,
  },

  picker: {
    color: "white",
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    paddingLeft: 15,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },

  pressable: {
    backgroundColor: "#0494c4",
    padding: 10,
    borderRadius: 10,
    width: 150,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
