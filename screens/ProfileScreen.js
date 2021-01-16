import React from "react";
import { Button } from "react-native-elements";
import { View } from "react-native";
import MyHeader from "../components/MyHeader";

export default function ProfileScreen({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: "#001f3f" }}>
      <MyHeader navigation={navigation} text="Profile" />
      <Button
        title="Register"
        raised
        containerStyle={{ width: 150, alignSelf: "center", margin: 10 }}
        buttonStyle={{ borderRadius: 20, backgroundColor: "#0074D9" }}
      />
    </View>
  );
}
