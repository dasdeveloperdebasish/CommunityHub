import { RouteProp, useRoute } from "@react-navigation/native";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { AppStackParamList } from "@/core/navigation/types";
import { PostCard } from "@/features/posts/components/PostCard";
import { usePosts } from "@/features/posts/queries/usePosts";
import { ROUTES } from "@/shared/constants/routes";

type CommunityDetailsRouteProp = RouteProp<
  AppStackParamList,
  typeof ROUTES.COMMUNITY_DETAILS
>;

export const CommunityDetailsScreen = (): React.JSX.Element => {
  const route = useRoute<CommunityDetailsRouteProp>();

  const { communityId, communityName } = route.params;

  const { data, isLoading, isError } = usePosts(communityId);

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text>Failed to load posts</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <PostCard post={item} />}
      ListHeaderComponent={
        <View style={styles.header}>
          <Text style={styles.title}>{communityName}</Text>

          <Text style={styles.subtitle}>Community ID: {communityId}</Text>

          <Text style={styles.sectionTitle}>Posts</Text>
        </View>
      }
      contentContainerStyle={styles.content}
    />
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 16,
  },

  header: {
    marginBottom: 16,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 8,
  },

  subtitle: {
    color: "#6B7280",
    marginBottom: 24,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
