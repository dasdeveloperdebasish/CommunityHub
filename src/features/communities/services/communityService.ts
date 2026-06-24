import { apiClient } from "@/shared/services/apiClient";
import { Community, CommunityResponse } from "../types/community";

export const communityService = {
  async getCommunities(): Promise<Community[]> {
    const { data } = await apiClient.get<CommunityResponse[]>("/users");

    return data.map((user) => ({
      id: user.id,
      name: user.company.name,
      description: user.company.catchPhrase,
      memberCount: Math.floor(Math.random() * 5000) + 100,
    }));
  },
};
