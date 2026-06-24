import { NavigationContainer } from "@react-navigation/native";
import React from "react";

import { AuthNavigator } from "./AuthNavigator";

export const RootNavigator = (): React.JSX.Element => {
  return (
    <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
  );
};
