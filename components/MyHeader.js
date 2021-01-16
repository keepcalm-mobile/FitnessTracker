import React from "react";
import { Header, Icon } from "react-native-elements";

export default function MyHeader(props) {
  if (props.home) {
    return (
      <Header
        containerStyle={{
          borderBottomColor: "#0074D9",
        }}
        statusBarProps={{
          backgroundColor: "#34568B",
        }}
        backgroundColor="#0074D9"
        centerComponent={{
          text: "Tracker App",
          style: {
            fontSize: 24,
            fontWeight: "bold",
            color: "white",
          },
        }}
        {...props}
      />
    );
  } else {
    return (
      <Header
        containerStyle={{
          borderBottomColor: "#0074D9",
        }}
        statusBarProps={{
          backgroundColor: "#34568B",
        }}
        backgroundColor="#0074D9"
        leftComponent={
          <Icon
            name="arrow-back"
            onPress={() => props.navigation.navigate("Workout")}
            color="white"
            size={30}
          />
        }
        centerComponent={{
          text: props.text,
          style: { fontSize: 24, fontWeight: "bold", color: "white" },
        }}
        {...props}
      />
    );
  }
}
