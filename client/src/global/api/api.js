import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../../config";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl}/api/v1` }),
  tagTypes: ["Chat", "User"],

  endpoints: (builder) => ({
    myChates: builder.query({
      query: () => ({ url: "/get_my_chat", credentials: "include" }),
      providesTags: ["Chat"],
    }),

    getNotification: builder.query({
      query: () => ({ url: "/get_all_notification", credentials: "include" }),
      providesTags: ["Chat"],
    }),

    searchUser: builder.query({
      query: ({ search, limit, page }) => ({
        url: `/search_user?search=${search}&limit=${limit}&page=${page}`,
        credentials: "include",
      }),
      keepUnusedDataFor: 0,
    }),

    sendFriendRequest: builder.mutation({
      query: (data) => ({
        url: `/send_friend_request`,
        method: "PUT",
        credentials: "include",
        body: data,
      }),
      providesTags: ["User"],
    }),
    acceptFriendRequest: builder.mutation({
      query: (data) => ({
        url: `/accept_friend_request`,
        method: "PUT",
        credentials: "include",
        body: data,
      }),
      providesTags: ["Chat"],
    }),
  }),
});

export default api;

export const {
  useMyChatesQuery,
  useLazySearchUserQuery,
  useSendFriendRequestMutation,
  useGetNotificationQuery,
  useAcceptFriendRequestMutation,
} = api;
