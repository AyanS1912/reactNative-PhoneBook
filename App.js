import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import AllContacts from "./screens/myContacts";
import UpdateCreateContact from "./screens/edit_add_Contact";
import FavContact from "./screens/favContacts";
import ContactDetails from "./screens/contactDetails";

import { globalColors } from "./constants/styles";
import { Ionicons } from "@expo/vector-icons";
import IconButton from "./components/iconButton";

import { store } from "./store/store";
import { Provider } from "react-redux";
import DialerScreen from "./screens/dialpad";

const BottomTabs = createBottomTabNavigator();
const Stack = createStackNavigator();

function BottomTabOverview() {
  return (
    <BottomTabs.Navigator
      initialRouteName="Add New Contacts"
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: globalColors.primaryColor,
        },
        headerTintColor: "white",
        tabBarStyle: {
          backgroundColor: globalColors.primaryColor,
        },
        tabBarActiveTintColor: "white",
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="add-circle"
            color={tintColor}
            size={24}
            onPressHandler={() => {
              navigation.navigate("Add");
            }}
          ></IconButton>
        ),
      })}
    >
      <BottomTabs.Screen
        name="Dialer"
        component={DialerScreen}
        options={{
          title: "Dialer",
          tabBarLabel: "Dialer",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="call-outline" color="#fcfcfc" size={30}></Ionicons>
          ),
        }}
      />
      <BottomTabs.Screen
        name="my Favorite"
        component={FavContact}
        options={{
          title: "My Favorite",
          tabBarLabel: "Favorite",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="star" color="#fcfcfc" size={20}></Ionicons>
          ),
        }}
      />

      <BottomTabs.Screen
        name="My Contacts"
        component={AllContacts}
        options={{
          title: "All Contacts",
          tabBarLabel: "Contacts",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book-outline" color="#f5e6e6" size={30}></Ionicons>
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}
export default function App() {
  return (
    <>
      <StatusBar style="light"></StatusBar>
      <Provider store={store}>
        <NavigationContainer style={styles.container}>
          <Stack.Navigator>
            <Stack.Screen
              name="BottomTabOverview"
              component={BottomTabOverview}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Add"
              component={UpdateCreateContact}
              options={({ route }) => ({
                headerShown: true,
                title: route.params?.contacts ? "Edit Contact" : "New Contact",
                headerStyle: { backgroundColor: "#000" },
                headerTintColor: "white",
              })}
            />
            <Stack.Screen
              name="ContactDetails"
              component={ContactDetails}
              options={({ route }) => ({
                headerShown: true,
                title: "Details",
                headerStyle: { backgroundColor: globalColors.primaryColor },
                headerTintColor: "white",
              })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
});
