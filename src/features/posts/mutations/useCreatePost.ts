import { useMutation, useQueryClient } from "@tanstack/react-query";

import { postMutationService } from "@/features/posts/services/postMutationService";
import { Post } from "@/features/posts/types/post";
import { QUERY_KEYS } from "@/shared/constants/queryKeys";

interface CreatePostVariables {
  communityId: number;
  title: string;
  body: string;
}

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ communityId, title, body }: CreatePostVariables) =>
      postMutationService.createPost(communityId, {
        title,
        body,
      }),

    onMutate: async ({ communityId, title, body }) => {
      await queryClient.cancelQueries({
        queryKey: QUERY_KEYS.POSTS(communityId),
      });

      const previousPosts = queryClient.getQueryData<Post[]>(
        QUERY_KEYS.POSTS(communityId),
      );

      const optimisticPost: Post = {
        id: Date.now(),
        communityId,
        title,
        body,
      };

      queryClient.setQueryData<Post[]>(
        QUERY_KEYS.POSTS(communityId),
        (oldPosts = []) => [optimisticPost, ...oldPosts],
      );

      return {
        previousPosts,
      };
    },

    onError: (_error, variables, context) => {
      queryClient.setQueryData(
        QUERY_KEYS.POSTS(variables.communityId),
        context?.previousPosts,
      );
    },
  });
};
