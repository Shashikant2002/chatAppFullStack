import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./slices/userSlice";
import apiRTKQuery from "./api/api";

export const store = configureStore({
  reducer: { user: userSlice, [apiRTKQuery.reducerPath]: apiRTKQuery.reducer },
  middleware: (defaultMiddleWare) => [...defaultMiddleWare(), apiRTKQuery.middleware],
});
