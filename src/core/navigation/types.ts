import { ROUTES } from "../../shared/constants/routes";

export type AuthStackParamList = {
  [ROUTES.LOGIN]: undefined;
};

export type AppStackParamList = {
  [ROUTES.COMMUNITY_LIST]: undefined;

  [ROUTES.COMMUNITY_DETAILS]: {
    communityId: number;
    communityName: string;
  };

  [ROUTES.CREATE_POST]: {
    communityId: number;
  };
};
