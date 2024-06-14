import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import userSlice from "./user/userSlice";
import agentSlice from "./agent/agentSlice";
import leadSlice from "./lead/leadSlice";
import chatSlice from "./chat/chatSlice";
import sidebarReducer from "./sidebar/sidebarSlice"
const reducers = combineReducers({
  user: userSlice,
  agent:agentSlice,
  lead:leadSlice,
  chat:chatSlice,
  sidebarShow:sidebarReducer,
});

const store = configureStore({
  reducer: reducers,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export default store;
