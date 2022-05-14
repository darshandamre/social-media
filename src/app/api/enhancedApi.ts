import { api as generatedApi } from "./generated/graphql";

export const enhancedApi = generatedApi.enhanceEndpoints({
  addTagTypes: ["Me"],
  endpoints: {
    Me: {
      providesTags: ["Me"]
    },
    Register: {
      invalidatesTags: ["Me"]
    },
    Login: {
      invalidatesTags: ["Me"]
    },
    Logout: {
      invalidatesTags: ["Me"]
    }
  }
});
