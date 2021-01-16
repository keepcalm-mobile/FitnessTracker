import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import HistoryScreen from "./screens/HistoryScreen";
import { MaterialIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Workout"
        tabBarOptions={{
          activeTintColor: "white",
          inactiveTintColor: "#BAC7D1",
          activeBackgroundColor: "#0074D9",
          inactiveBackgroundColor: "#0074D9",
          style: { borderTopColor: "#0074D9" },
        }}
      >
        <Tab.Screen
          name="History"
          component={HistoryScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="schedule" size={30} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Workout"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="play-arrow" size={30} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="person" size={30} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
