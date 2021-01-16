import React, { useState, useEffect } from "react";
import {
  Button,
  ListItem,
  Avatar,
  Text,
  Input,
  Icon,
} from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, TouchableOpacity } from "react-native";
import items from "../data/exercises";
import MyHeader from "../components/MyHeader";
import StartOverlay from "../components/StartOverlay";
import MainOverlay from "../components/MainOverlay";
import OptionsMenu from "react-native-option-menu";
import RoutineOverlay from "../components/RoutineOverlay";
import routines from "../data/routines";

export default function HomeScreen() {
  //Initializing state values
  const [startOverlay, setStartOverlay] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const [data, setData] = useState(items);
  const [checked, setChecked] = useState([]);
  const [session, setSession] = useState({
    exercises: {},
    date: {},
    id: {},
    time: {},
  });
  const [workout, setWorkout] = useState([]);
  //Start Overlay
  const handleStart = () => {
    setStartOverlay(!startOverlay);
  };
  //Reading Data from Database
  const readData = async () => {
    try {
      const data = await AsyncStorage.getItem("workout");
      setWorkout(JSON.parse(data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    readData();
  }, []);
  //Main Overlay
  const handleOverlay = () => {
    setOverlay(!overlay);
  };
  //Checkbox
  const handleCheck = (item) => {
    let position = data.indexOf(item);
    let copy = [...data];
    copy[position].checked = !copy[position].checked;
    setData(copy);
  };
  //Submit Exercises
  const handleSubmit = (data) => {
    let arr = [];
    let items = [...data];
    let now = new Date();
    let copy = { exercises: {}, date: {}, id: {}, items: {}, time: {} };
    copy["date"] = `${now.getDate()}.${now.getMonth()}.${now.getFullYear()}`;
    copy["time"] = `${now.getHours()}:${now.getMinutes()}`;
    copy["id"] = now.getTime().toString();
    items.forEach((element) => {
      if (element.checked) {
        arr.push(element.name);
        copy["exercises"][element.name] = [""];
        element.checked = false;
      }
    });
    setData(items);
    setSession(copy);
    setChecked(arr);
    setOverlay(!overlay);
    setStartOverlay(!startOverlay);
    readData();
  };
  //Add a Set
  const handleSet = (item) => {
    let copy = { ...session };
    copy["exercises"][item].push("");
    setSession(copy);
  };
  //Save Data
  const saveData = async (data) => {
    try {
      await AsyncStorage.setItem("workout", JSON.stringify(data));
    } catch (err) {
      alert("Data not saved");
    }
  };
  //Submit Workout
  const handleMain = (data) => {
    let copy;
    if (workout) {
      copy = [...workout];
    } else {
      copy = [];
    }
    copy.push(data);
    setWorkout(copy);
    saveData(copy);
    handleOverlay();
  };
  //Change Reps
  const handleChange = (value, index, item) => {
    let copy = { ...session };
    copy["exercises"][item][index] = value;
    setSession(copy);
  };
  //Render Content of MainOverlay
  const content = checked.map((item, key) => (
    <View key={key}>
      <Text h4>{item}</Text>
      {session["exercises"][item].map((number, key) => (
        <View key={key}>
          <Input
            containerStyle={{
              margin: 1,
              width: 100,
              height: 50,
            }}
            inputContainerStyle={{
              borderColor: "#0074D9",
              borderWidth: 1,
              borderRadius: 10,
            }}
            inputStyle={{ textAlign: "center", color: "#0074D9" }}
            underlineColorAndroid="white"
            value={number.toString()}
            onChangeText={(value) => handleChange(value, key, item)}
            keyboardType="decimal-pad"
          />
        </View>
      ))}
      <Button
        onPress={() => handleSet(item)}
        title="Add Set"
        raised
        containerStyle={{ width: 150 }}
        buttonStyle={{ backgroundColor: "#0074D9", borderRadius: 20 }}
      />
    </View>
  ));
  //Render Content of StartOverlay
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={{
          height: 60,
          width: 325,
          borderRadius: 15,
          borderWidth: 0.7,
          borderColor: "#0074D9",
          margin: 5,
        }}
        onPress={() => handleCheck(item)}
      >
        <View style={{ flexDirection: "row" }}>
          <Avatar
            rounded
            size="medium"
            source={{ uri: item.image }}
            containerStyle={{ margin: 5, flex: 1 }}
          />
          <Text
            style={{
              alignSelf: "center",
              fontSize: 28,
              fontWeight: "bold",
              flex: 4,
            }}
          >
            {item.name}
          </Text>
          <ListItem.CheckBox
            checkedIcon="done"
            iconType="material"
            uncheckedIcon="done"
            uncheckedColor="white"
            checkedColor="#0074D9"
            checked={item.checked}
            onPress={() => handleCheck(item)}
            containerStyle={{ alignSelf: "center", flex: 1 }}
            size={30}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const clearDatabase = () => {
    AsyncStorage.clear();
    setWorkout([]);
  };

  const customIcon = (
    <Icon type="material" name="more-vert" color="white" size={30} />
  );

  //Render HomeScreen
  return (
    <View style={{ flex: 1, backgroundColor: "#001f3f" }}>
      <MyHeader
        home
        rightComponent={
          <OptionsMenu
            customButton={customIcon}
            destructiveIndex={0}
            options={["Clear Database", "Close"]}
            actions={[clearDatabase]}
          />
        }
      />
      <StartOverlay
        startOverlay={startOverlay}
        handleStart={handleStart}
        data={data}
        renderItem={renderItem}
        handleSubmit={handleSubmit}
      />
      <MainOverlay
        overlay={overlay}
        handleOverlay={handleOverlay}
        content={content}
        session={session}
        handleMain={handleMain}
      />
      <View>
        <Button
          onPress={handleStart}
          title="Start New Workout"
          buttonStyle={{
            backgroundColor: "#0074D9",
            borderRadius: 20,
          }}
          containerStyle={{
            margin: 10,
            width: 250,
            alignSelf: "center",
          }}
          raised
        />
      </View>
      <RoutineOverlay items={routines} />
    </View>
  );
}
