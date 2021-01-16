import React, { useState } from "react";
import { ScrollView, View, Vibration } from "react-native";
import { Overlay, Text, Icon, Button } from "react-native-elements";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import Modal from "react-native-modal";

export default function MainOverlay(props) {
  const [timer, setTimer] = useState(false);
  const [active, setActive] = useState(false);
  const [seconds, setSeconds] = useState(60);
  const [text, setText] = useState("Start");
  const handleTimer = () => {
    setTimer(!timer);
    setActive(false);
    setText("Start");
  };
  const handleButton = () => {
    setActive(!active);
    if (text === "Start") {
      setText("Stop");
    } else {
      setText("Start");
    }
  };

  return (
    <View>
      <Overlay
        animationType="fade"
        isVisible={timer}
        onBackdropPress={handleTimer}
        overlayStyle={{
          borderRadius: 10,
          height: 300,
          width: 300,
        }}
      >
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <View style={{ flexDirection: "row" }}>
            <Text h4 style={{ textAlign: "center", flex: 1 }}>
              Timer
            </Text>
            <Icon
              type="material"
              name="clear"
              size={30}
              onPress={handleTimer}
              containerStyle={{ position: "absolute", right: 0 }}
            />
          </View>
          <CountdownCircleTimer
            isPlaying={active}
            duration={seconds}
            colors="#0074D9"
            strokeWidth={8}
            onComplete={() => {
              setActive(false);
              setText("Start");
              Vibration.vibrate();
            }}
          >
            {({ remainingTime }) => (
              <Text
                style={{ fontSize: 50, fontWeight: "bold", color: "#0074D9" }}
              >
                {remainingTime}
              </Text>
            )}
          </CountdownCircleTimer>
          <View style={{ flexDirection: "row" }}>
            <Button
              title={text}
              raised
              containerStyle={{ width: 150, alignSelf: "center", margin: 5 }}
              buttonStyle={{ backgroundColor: "#0074D9", borderRadius: 20 }}
              onPress={handleButton}
            />
          </View>
        </View>
      </Overlay>
      <Modal
        animationIn="slideInUp"
        animationOut="slideOutDown"
        animationInTiming={500}
        animationOutTiming={500}
        isVisible={props.overlay}
        style={{ margin: 0 }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "white",
            borderRadius: 5,
          }}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ margin: 5 }}
          >
            <View style={{ flexDirection: "row" }}>
              <Icon
                type="material"
                name="update"
                size={45}
                containerStyle={{ flex: 1 }}
                onPress={handleTimer}
              />
              <Text style={{ flex: 5, textAlign: "center" }} h2>
                Workout
              </Text>
              <Icon
                containerStyle={{ flex: 1 }}
                name="keyboard-arrow-down"
                type="material"
                onPress={props.handleOverlay}
                size={45}
              />
            </View>
            {props.content}
          </ScrollView>
          <Icon
            containerStyle={{
              position: "absolute",
              bottom: 10,
              right: 10,
            }}
            reverse
            raised
            color="#0074D9"
            type="material"
            name="done"
            onPress={() => props.handleMain(props.session)}
          />
        </View>
      </Modal>
    </View>
  );
}
