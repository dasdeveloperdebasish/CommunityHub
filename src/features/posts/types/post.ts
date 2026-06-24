export interface PostResponse {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface Post {
  id: number;
  communityId: number;
  title: string;
  body: string;
}
