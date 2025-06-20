import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../presentation/screens/HomeScreen/HomeScreen";
import DetailsScreen from "../presentation/screens/DetailsScreen/DetailsScreen";
import SearchScreen from "../presentation/screens/SearchScreen/SearchScreen";

export type RootStackParamList = {
  Home: undefined;
  Details: { article: any };
  Search: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
