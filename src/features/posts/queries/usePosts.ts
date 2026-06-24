import { useQuery } from "@tanstack/react-query";

import { postService } from "@/features/posts/services/postService";
import { QUERY_KEYS } from "@/shared/constants/queryKeys";

export const usePosts = (communityId: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.POSTS(communityId),
    queryFn: () => postService.getPostsByCommunityId(communityId),
  });
};
