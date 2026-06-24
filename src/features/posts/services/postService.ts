import { apiClient } from "@/shared/services/apiClient";

import { Post, PostResponse } from "@/features/posts/types/post";

export const postService = {
  async getPostsByCommunityId(communityId: number): Promise<Post[]> {
    const { data } = await apiClient.get<PostResponse[]>(
      `/posts?userId=${communityId}`,
    );

    return data.map((post) => ({
      id: post.id,
      communityId: post.userId,
      title: post.title,
      body: post.body,
    }));
  },
};
