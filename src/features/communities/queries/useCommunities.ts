import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/shared/constants/queryKeys";
import { communityService } from "../services/communityService";

export const useCommunities = () => {
  return useQuery({
    queryKey: QUERY_KEYS.COMMUNITIES,
    queryFn: communityService.getCommunities,
  });
};
