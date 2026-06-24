import { zodResolver } from "@hookform/resolvers/zod";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";

import { AppStackParamList } from "@/core/navigation/types";
import { useCreatePost } from "@/features/posts/mutations/useCreatePost";
import {
  createPostSchema,
  CreatePostSchema,
} from "@/features/posts/schemas/createPostSchema";
import { ROUTES } from "@/shared/constants/routes";

type CreatePostRouteProp = RouteProp<
  AppStackParamList,
  typeof ROUTES.CREATE_POST
>;

export const CreatePostScreen = (): React.JSX.Element => {
  const navigation = useNavigation();

  const route = useRoute<CreatePostRouteProp>();

  const { communityId } = route.params;

  const { mutateAsync, isPending } = useCreatePost();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePostSchema>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: "",
      body: "",
    },
  });

  const onSubmit = async (values: CreatePostSchema): Promise<void> => {
    try {
      await mutateAsync({
        communityId,
        title: values.title,
        body: values.body,
      });

      Alert.alert("Success", "Post created successfully");

      navigation.goBack();
    } catch {
      Alert.alert("Error", "Failed to create post");
    }
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="title"
        render={({ field: { value, onChange } }) => (
          <>
            <TextInput
              value={value}
              onChangeText={onChange}
              placeholder="Title"
              style={styles.input}
            />

            {errors.title && (
              <Text style={styles.error}>{errors.title.message}</Text>
            )}
          </>
        )}
      />

      <Controller
        control={control}
        name="body"
        render={({ field: { value, onChange } }) => (
          <>
            <TextInput
              value={value}
              onChangeText={onChange}
              placeholder="Body"
              multiline
              style={[styles.input, styles.bodyInput]}
            />

            {errors.body && (
              <Text style={styles.error}>{errors.body.message}</Text>
            )}
          </>
        )}
      />

      <Button
        title={isPending ? "Creating..." : "Create Post"}
        onPress={handleSubmit(onSubmit)}
        disabled={isPending}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },

  bodyInput: {
    minHeight: 120,
    textAlignVertical: "top",
  },

  error: {
    color: "red",
    marginBottom: 12,
  },
});
