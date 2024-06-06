import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../../config";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl}/api/v1` }),
  tagTypes: ["Chat"],

  endpoints: (builder) => ({
    myChates: builder.query({
      query: () => ({ url: "/get_my_chat", credentials: "include" }),
      providesTags: ["Chat"],
    }),
  }),
});

export default api;

export const { useMyChatesQuery } = api;
