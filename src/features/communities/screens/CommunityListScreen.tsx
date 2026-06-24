import { AppStackParamList } from "@/core/navigation/types";
import { ROUTES } from "@/shared/constants/routes";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { CommunityCard } from "../components/CommunityCard";
import { useCommunities } from "../queries/useCommunities";

export const CommunityListScreen = (): React.JSX.Element => {
  const navigation = useNavigation<NavigationProp<AppStackParamList>>();

  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading, isError, refetch, isRefetching } = useCommunities();

  const filteredCommunities = useMemo(() => {
    return (
      data?.filter((community) =>
        community.name.toLowerCase().includes(searchQuery.toLowerCase()),
      ) ?? []
    );
  }, [data, searchQuery]);

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
        <Text>Failed to load communities</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search communities"
        style={styles.searchInput}
      />

      <FlatList
        data={filteredCommunities}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CommunityCard
            community={item}
            onPress={() =>
              navigation.navigate(ROUTES.COMMUNITY_DETAILS, {
                communityId: item.id,
                communityName: item.name,
              })
            }
          />
        )}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
        removeClippedSubviews
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={10}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  searchInput: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
