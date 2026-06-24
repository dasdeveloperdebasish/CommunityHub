import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Community } from "../types/community";

interface CommunityCardProps {
  community: Community;
  onPress: () => void;
}

export const CommunityCard = ({
  community,
  onPress,
}: CommunityCardProps): React.JSX.Element => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Text style={styles.title}>{community.name}</Text>

      <Text style={styles.description}>{community.description}</Text>

      <View style={styles.footer}>
        <Text>{community.memberCount} members</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },

  description: {
    color: "#6B7280",
    marginBottom: 12,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
