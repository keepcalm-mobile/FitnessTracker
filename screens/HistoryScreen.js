import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, TouchableOpacity, FlatList, ScrollView } from "react-native";
import { Text, Icon, SearchBar } from "react-native-elements";
import MyHeader from "../components/MyHeader";
import Modal from "react-native-modal";

export default function HistoryScreen({ navigation }) {
  //State Values
  const [storage, setStorage] = useState([]);
  const [session, setSession] = useState({ exercises: {}, date: {}, id: {} });
  const [modal, setModal] = useState(false);

  //Reading Data
  const readData = async () => {
    try {
      const data = await AsyncStorage.getItem("workout");
      setStorage(JSON.parse(data));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    readData();
  }, []);

  const Exercises = () => {
    return Object.keys(session["exercises"]).map((key, index) => (
      <View key={index}>
        <Text h4>{key}</Text>
        {session["exercises"][key].map((value, key) => (
          <View key={key}>
            <Text h4>Set {key + 1}</Text>
            <Text h4>{value}</Text>
          </View>
        ))}
      </View>
    ));
  };

  const ModalContent = () => (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        backgroundColor: "white",
        flex: 1,
        borderRadius: 15,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <Text style={{ fontSize: 35, fontWeight: "bold", flex: 5 }}>
          Exercises
        </Text>
        <Icon
          type="material"
          name="clear"
          size={35}
          onPress={() => setModal(!modal)}
          containerStyle={{ marginTop: 10, marginRight: 5 }}
        />
      </View>
      <Exercises />
      <Text h2>Date</Text>
      <Text h4>{session["date"]}</Text>
      <Text h2>Time</Text>
      <Text h4>{session["time"]}</Text>
    </ScrollView>
  );

  const handleDetails = (data) => {
    setSession({ exercises: {}, date: {}, id: {} });
    setSession(data);
    setModal(!modal);
  };
  //Render List
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={{
          alignSelf: "center",
          width: 350,
          height: 60,
          borderRadius: 10,
          backgroundColor: "#0074D9",
          justifyContent: "center",
          margin: 5,
        }}
        onPress={() => handleDetails(item)}
      >
        <Text
          style={{
            color: "white",
            fontSize: 25,
            alignSelf: "center",
          }}
        >
          {item["date"]}
        </Text>
      </TouchableOpacity>
    );
  };

  //Render HistoryScreen
  return (
    <View style={{ flex: 1, backgroundColor: "#001f3f" }}>
      <MyHeader
        navigation={navigation}
        text="History"
        rightComponent={
          <Icon
            name="refresh"
            type="material"
            color="white"
            onPress={() => readData()}
            size={30}
          />
        }
      />
      <FlatList
        data={storage}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        style={{ marginTop: 5 }}
      />
      <Modal
        isVisible={modal}
        propagateSwipe
        useNativeDriver={true}
        animationInTiming={300}
        animationOutTiming={300}
        animationIn="zoomIn"
        animationOut="zoomOut"
        style={{ marginTop: 50, marginBottom: 50 }}
      >
        <ModalContent />
      </Modal>
    </View>
  );
}
