import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { Post } from "@/features/posts/types/post";

interface PostCardProps {
  post: Post;
}

export const PostCard = ({ post }: PostCardProps): React.JSX.Element => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{post.title}</Text>

      <Text style={styles.body}>{post.body}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    textTransform: "capitalize",
  },

  body: {
    color: "#6B7280",
    lineHeight: 22,
  },
});
