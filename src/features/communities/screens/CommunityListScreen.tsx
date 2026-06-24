import { AppStackParamList } from "@/core/navigation/types";
import { CommunityCard } from "@/features/communities/components/CommunityCard";
import { useCommunities } from "@/features/communities/queries/useCommunities";
import { ROUTES } from "@/shared/constants/routes";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const PAGE_SIZE = 4;

export const CommunityListScreen = (): React.JSX.Element => {
  const navigation = useNavigation<NavigationProp<AppStackParamList>>();

  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, refetch, isRefetching } = useCommunities();

  const filteredCommunities = useMemo(() => {
    return (
      data?.filter((community) =>
        community.name.toLowerCase().includes(searchQuery.toLowerCase()),
      ) ?? []
    );
  }, [data, searchQuery]);

  const paginatedCommunities = useMemo(() => {
    return filteredCommunities.slice(0, page * PAGE_SIZE);
  }, [filteredCommunities, page]);

  useEffect(() => {
    setPage(1);
  }, [searchQuery]);

  const loadMore = (): void => {
    if (page * PAGE_SIZE < filteredCommunities.length) {
      setPage((prev) => prev + 1);
    }
  };

  const renderFooter = (): React.JSX.Element | null => {
    if (paginatedCommunities.length >= filteredCommunities.length) {
      return null;
    }

    return (
      <View style={styles.footer}>
        <ActivityIndicator />
      </View>
    );
  };

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
        data={paginatedCommunities}
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
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        removeClippedSubviews
        initialNumToRender={5}
        maxToRenderPerBatch={5}
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

  footer: {
    paddingVertical: 16,
    alignItems: "center",
  },
});
