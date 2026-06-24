import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

const Stack = createNativeStackNavigator();

export const AuthNavigator = (): React.JSX.Element => {
  return <Stack.Navigator />;
};
