import * as SecureStore from "expo-secure-store";

import { STORAGE_KEYS } from "@/shared/constants/storageKeys";

export interface PostDraft {
  title: string;
  body: string;
}

export const draftStorage = {
  async saveDraft(draft: PostDraft): Promise<void> {
    await SecureStore.setItemAsync(
      STORAGE_KEYS.POST_DRAFT,
      JSON.stringify(draft),
    );
  },

  async getDraft(): Promise<PostDraft | null> {
    const draft = await SecureStore.getItemAsync(STORAGE_KEYS.POST_DRAFT);

    if (!draft) {
      return null;
    }

    return JSON.parse(draft) as PostDraft;
  },

  async clearDraft(): Promise<void> {
    await SecureStore.deleteItemAsync(STORAGE_KEYS.POST_DRAFT);
  },
};
