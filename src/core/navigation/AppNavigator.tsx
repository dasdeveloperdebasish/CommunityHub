import { CommunityDetailsScreen } from "@/features/communities/screens/CommunityDetailsScreen";
import { CommunityListScreen } from "@/features/communities/screens/CommunityListScreen";
import { CreatePostScreen } from "@/features/posts/screens/CreatePostScreen";
import { ROUTES } from "@/shared/constants/routes";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { AppStackParamList } from "./types";

const Stack = createNativeStackNavigator<AppStackParamList>();

export const AppNavigator = (): React.JSX.Element => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ROUTES.COMMUNITY_LIST}
        component={CommunityListScreen}
        options={{
          title: "Communities",
        }}
      />

      <Stack.Screen
        name={ROUTES.COMMUNITY_DETAILS}
        component={CommunityDetailsScreen}
        options={{
          title: "Community Details",
        }}
      />
      <Stack.Screen
        name={ROUTES.CREATE_POST}
        component={CreatePostScreen}
        options={{
          title: "Create Post",
        }}
      />
    </Stack.Navigator>
  );
};
