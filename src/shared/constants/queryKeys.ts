export const QUERY_KEYS = {
  COMMUNITIES: ["communities"],

  POSTS: (communityId: number) => ["posts", communityId],
} as const;
