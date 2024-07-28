import { View, Pressable, Text, StyleSheet, Image } from "react-native";
import { globalColors } from "../constants/styles";
import { Ionicons } from "@expo/vector-icons";

import { useSelector, useDispatch } from "react-redux";
import { addFavorite, removeFavorite } from "../store/favorite";
import IconButton from "./iconButton";

import { useNavigation } from "@react-navigation/native";

function ContactCard({ id, name, company, email, gender, phone, imageUri }) {
  const FavoriteId = useSelector((state) => state.favoriteContact.ids);

  const isFavorite = FavoriteId.includes(id);
  const dispatch = useDispatch();

  const navigation = useNavigation();

  function changeFavoriteStatus() {
    if (isFavorite) {
      dispatch(removeFavorite({ id: id }));
    } else {
      dispatch(addFavorite({ id: id }));
    }
  }

  function detailHandler() {
    navigation.navigate("ContactDetails", {
      id,
      name,
      company,
      email,
      gender,
      phone,
      imageUri,
    });
  }

  return (
    <View style={styles.mainContainer}>
      <Pressable
        android_ripple={{ color: globalColors.clickColor }}
        style={styles.cardHolder}
        onPress={detailHandler}
      >
        <View>
          <Image
            source={
              imageUri && imageUri !== ""
                ? { uri: imageUri }
                : require("../assets/user.jpeg")
            }
            style={styles.imageContainer}
          />
        </View>
        <View style={styles.cardContainer}>
          <Text style={styles.cardText}>Name : {name}</Text>
          <Text style={styles.cardText}>Phone Number : {phone}</Text>
        </View>

        <Pressable>
          <View>
            <IconButton
              icon={isFavorite ? "star" : "star-outline"}
              size={20}
              color={isFavorite ? "gold" : "white"}
              onPressHandler={changeFavoriteStatus}
            ></IconButton>
          </View>
        </Pressable>
      </Pressable>
    </View>
  );
}

export default ContactCard;

const styles = StyleSheet.create({
  mainContainer: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
  cardHolder: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 15,
    backgroundColor: "#363636",
    borderRadius: 20,
    elevation: 10,
  },
  cardContainer: {
    padding: 20,
    margin: 10,
  },

  cardText: {
    color: "white",
  },

  imageContainer: {
    borderRadius: 1000,
    height: 45,
    width: 45,
  },
});
