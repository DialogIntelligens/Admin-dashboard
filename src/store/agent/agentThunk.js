// import { axiosInstance } from "./../../utils/axios";
import axiosInstance from "../../utils/axios"
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const createAgentAction = createAsyncThunk(
  "agent/CreateAgent",
  async ({ payload, onSuccess }, thunkAPI) => {
    try {
      const {data,status} = await axiosInstance.post(`/agent/create-agent`,payload);
      if (status == 200) {
        onSuccess();
        toast.success("Agent Created");
        return data;
      }
      else {
        toast.warning(data?.details);
        return thunkAPI.rejectWithValue(response);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.details || "Server error";
      toast.warning(errorMessage);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const AgentStatusAction = createAsyncThunk(
  "agent/updateStatus",
  async ({ payload,onSuccess }, {thunkAPI}) => {
    try {
      const {data,status} = await axiosInstance.post(`/agent/switch-agent-status`,payload);
      if (status == 200) {
        onSuccess();
        toast.success("Status changed");
        return data;
      }
      else {
        toast.warning(data?.details);
        return thunkAPI.rejectWithValue(response);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.details;
      toast.warning(errorMessage);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

