import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, StyleSheet, Vibration } from "react-native";
import { Text, Icon, Button, Input } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import Swiper from "react-native-swiper";
import Modal from "react-native-modal";

export default function RoutineOverlay({ items }) {
  const [isOpen, setIsOpen] = useState(false);
  const [exercise, setExercise] = useState("Pull Ups");
  const [routines, setRoutines] = useState({
    "Pull Ups": 0,
    "Push Ups": 0,
    "Parallel Dips": 0,
  });
  const [set, setSet] = useState(0);
  const [week, setWeek] = useState(0);
  const [work, setWork] = useState([]);
  const [active, setActive] = useState(false);
  const [text, setText] = useState("Start");
  const [timer, setTimer] = useState(false);
  const [settings, setSettings] = useState(false);
  const [value, setValue] = useState("");

  const handleButton = () => {
    if (text === "Start") {
      setText("Stop");
    } else {
      setText("Start");
    }
    setActive(!active);
  };

  const handleSubmit = () => {
    let copy = { "Pull Ups": 0, "Push Ups": 0, "Parallel Dips": 0 };
    let week = items[exercise].find(
      (element) => element[0] === parseInt(value)
    );
    copy[exercise] = items[exercise].indexOf(week);
    setRoutines(copy);
    setData(copy);
    setSettings(!settings);
    setIsOpen(!isOpen);
    setValue("");
  };

  const handleClose = () => {
    setActive(!active);
    setTimer(false);
    setText("Start");
    setSet(set + 1);
  };

  const handleTimer = () => {
    setTimer(true);
    setActive(true);
    setText("Stop");
  };

  const getData = async () => {
    try {
      const data = await AsyncStorage.getItem("routine");
      if (data != null) {
        setRoutines(JSON.parse(data));
      }
    } catch (err) {
      console.log("Routines not retrieved");
    }
  };

  const setData = async (data) => {
    try {
      await AsyncStorage.setItem("routine", JSON.stringify(data));
    } catch (err) {
      console.log("Data not saved");
    }
  };

  const readData = async () => {
    try {
      const data = await AsyncStorage.getItem("workout");
      setWork(JSON.parse(data));
    } catch (err) {
      console.log(err);
    }
  };

  const saveData = async (data) => {
    try {
      await AsyncStorage.setItem("workout", JSON.stringify(data));
    } catch (err) {
      alert("Data not saved");
    }
  };

  useEffect(() => {
    readData();
  }, []);

  const handlePress = (exercise) => {
    getData();
    setExercise(exercise);
    setIsOpen(!isOpen);
    setWeek(routines[exercise]);
    setSet(0);
    readData();
  };

  const handleSet = () => {
    if (set < 4) {
      handleTimer();
    } else {
      let session = { exercises: {}, date: {}, id: {}, time: {} };
      let now = new Date();
      session["exercises"][exercise] = items[exercise][week];
      session[
        "date"
      ] = `${now.getDate()}.${now.getMonth()}.${now.getFullYear()}`;
      session["time"] = `${now.getHours()}:${now.getMinutes()}`;
      session["id"] = now.getTime().toString();
      let copy;
      if (work) {
        copy = [...work];
      } else {
        copy = [];
      }
      copy.push(session);
      saveData(copy);
      setWork(copy);
      let routinesCopy = { ...routines };
      if (routinesCopy[exercise] < items[exercise].length) {
        routinesCopy[exercise] += 1;
      }
      setData(routinesCopy);
      setIsOpen(!isOpen);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Swiper horizontal={false} dotColor="white" activeDotColor="#0074D9">
        <TouchableOpacity onPress={() => handlePress("Pull Ups")}>
          <View style={styles.routineView}>
            <Text h2 style={styles.routineText}>
              Pull Ups Routine
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePress("Push Ups")}>
          <View style={styles.routineView}>
            <Text h2 style={styles.routineText}>
              Push Ups Routine
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePress("Parallel Dips")}>
          <View style={styles.routineView}>
            <Text h2 style={styles.routineText}>
              Parallel Dips Routine
            </Text>
          </View>
        </TouchableOpacity>
      </Swiper>
      <Modal
        animationIn="slideInRight"
        animationOut="slideOutRight"
        animationInTiming={800}
        animationOutTiming={500}
        swipeDirection="right"
        onSwipeComplete={() => setIsOpen(!isOpen)}
        hideModalContentWhileAnimating={true}
        isVisible={isOpen}
        onBackButtonPress={() => setIsOpen(!isOpen)}
        style={{ margin: 0 }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "white",
            borderRadius: 5,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Icon
              type="material"
              name="settings"
              size={40}
              onPress={() => setSettings(!settings)}
              containerStyle={{ position: "absolute", right: 50, top: 5 }}
            />
            <Text h2 style={{ marginLeft: 10 }}>
              {exercise}
            </Text>
            <Icon
              type="material"
              name="clear"
              size={40}
              onPress={() => setIsOpen(!isOpen)}
              containerStyle={{ position: "absolute", right: 5, top: 5 }}
            />
          </View>
          <View style={styles.main}>
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontSize: 100,
                textAlignVertical: "center",
                marginTop: 100,
              }}
            >
              {items[exercise][week][set]}
            </Text>
            <TouchableOpacity
              onPress={handleSet}
              style={{ width: 150, alignSelf: "center", marginTop: 40 }}
            >
              <Text
                style={{ color: "white", textAlign: "center", fontSize: 30 }}
              >
                Done
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        animationIn="zoomIn"
        animationOut="slideOutRight"
        animationInTiming={400}
        animationOutTiming={500}
        isVisible={settings}
        onBackButtonPress={() => setSettings(!settings)}
        style={{ margin: 0 }}
      >
        <View style={{ flex: 1, backgroundColor: "white", borderRadius: 5 }}>
          <View style={{ flexDirection: "row" }}>
            <Text h2 style={{ marginLeft: 10 }}>
              {exercise}
            </Text>
            <Icon
              type="material"
              name="clear"
              size={40}
              onPress={() => setSettings(!settings)}
              containerStyle={{ position: "absolute", right: 5, top: 5 }}
            />
          </View>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Text h4 style={{ textAlign: "center" }}>
              Enter Your Maximum {exercise}:
            </Text>
            <Input
              containerStyle={{
                margin: 1,
                width: 150,
                height: 50,
                alignSelf: "center",
              }}
              inputContainerStyle={{
                borderColor: "#0074D9",
                borderWidth: 1,
                borderRadius: 10,
              }}
              inputStyle={{ textAlign: "center", color: "#0074D9" }}
              underlineColorAndroid="white"
              value={value}
              onChangeText={(value) => setValue(value)}
              keyboardType="decimal-pad"
            />
            <Button
              onPress={handleSubmit}
              title="Submit"
              raised
              containerStyle={{ width: 150, alignSelf: "center" }}
              buttonStyle={{ backgroundColor: "#0074D9", borderRadius: 10 }}
            />
          </View>
        </View>
      </Modal>
      <Modal
        animationIn="fadeIn"
        animationOut="fadeOut"
        isVisible={timer}
        onBackButtonPress={handleClose}
        style={{ margin: 0 }}
      >
        <View style={{ flex: 1, backgroundColor: "white", borderRadius: 5 }}>
          <Text h2 style={{ textAlign: "center" }}>
            Timer
          </Text>
          <View style={{ alignSelf: "center", marginTop: 100 }}>
            <CountdownCircleTimer
              isPlaying={active}
              duration={60}
              colors="#0074D9"
              strokeWidth={8}
              size={300}
              onComplete={() => {
                handleClose();
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
          </View>
          <Button
            title={text}
            titleStyle={{
              color: "#0074D9",
              fontSize: 30,
            }}
            containerStyle={{
              width: 100,
              alignSelf: "center",
              position: "absolute",
              bottom: 10,
              right: 10,
            }}
            type="clear"
            onPress={handleButton}
          />
          <Button
            title="Skip"
            titleStyle={{
              color: "#0074D9",
              fontSize: 30,
            }}
            containerStyle={{
              width: 100,
              alignSelf: "center",
              position: "absolute",
              bottom: 10,
              left: 10,
            }}
            type="clear"
            onPress={handleClose}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  routineView: {
    width: 350,
    height: 445,
    borderRadius: 15,
    borderColor: "#0074D9",
    borderWidth: 2,
    alignSelf: "center",
    justifyContent: "center",
  },
  routineText: {
    textAlign: "center",
    color: "#0074D9",
  },
  main: {
    height: 350,
    width: 350,
    borderRadius: 200,
    backgroundColor: "#0074D9",
    alignSelf: "center",
    marginTop: 100,
  },
});
