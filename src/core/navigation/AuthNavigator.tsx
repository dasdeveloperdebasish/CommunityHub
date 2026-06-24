import { LoginScreen } from "@/features/auth/screens/LoginScreen";
import { ROUTES } from "@/shared/constants/routes";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

const Stack = createNativeStackNavigator();

export const AuthNavigator = (): React.JSX.Element => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ROUTES.LOGIN}
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
