import React from "react";
import { View, FlatList } from "react-native";
import { Overlay, Text, Icon } from "react-native-elements";

export default function StartOverlay(props) {
  return (
    <Overlay
      animationType="fade"
      fullScreen
      isVisible={props.startOverlay}
      onBackdropPress={props.handleStart}
    >
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ flex: 5 }} h2>
            Exercises
          </Text>
          <Icon
            containerStyle={{ alignSelf: "flex-end", flex: 1 }}
            name="clear"
            type="material"
            onPress={props.handleStart}
            size={40}
          />
        </View>
        <FlatList data={props.data} renderItem={props.renderItem} />
        <Icon
          containerStyle={{
            position: "absolute",
            alignSelf: "flex-end",
            bottom: 10,
          }}
          reverse
          raised
          color="#0074D9"
          type="material"
          name="done"
          onPress={() => props.handleSubmit(props.data)}
        />
      </View>
    </Overlay>
  );
}
