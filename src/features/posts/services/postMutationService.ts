import { apiClient } from "@/shared/services/apiClient";

import { CreatePostFormData } from "@/features/posts/types/postForm";

export const postMutationService = {
  async createPost(communityId: number, payload: CreatePostFormData) {
    const { data } = await apiClient.post("/posts", {
      userId: communityId,
      ...payload,
    });

    return data;
  },
};
