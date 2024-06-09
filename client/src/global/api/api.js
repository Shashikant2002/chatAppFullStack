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
    searchUser: builder.query({
      query: ({search, limit, page}) => ({
        url: `/search_user?search=${search}&limit=${limit}&page=${page}`,
        credentials: "include",
      }),
      providesTags: ["User"],
    }),
  }),
});

export default api;

<<<<<<< HEAD
export const { useMyChatesQuery, useLazySearchUserQuery } = api;
=======
export const { useMyChatesQuery } = api;
>>>>>>> 680029d46f7b287de917d552307f3717419347ee
