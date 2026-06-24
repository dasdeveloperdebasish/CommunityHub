export interface CommunityResponse {
  id: number;
  name: string;
  username: string;
  email: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface Community {
  id: number;
  name: string;
  description: string;
  memberCount: number;
}
