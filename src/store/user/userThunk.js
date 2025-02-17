// import { axiosInstance } from "./../../utils/axios";
import axiosInstance from "../../utils/axios"
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const loginUser = createAsyncThunk(
  "user/login",
  async ({ payload, onSuccess }, thunkAPI) => {
    try {
      const {data,status} = await axiosInstance.post(`/auth/login?email=${payload.email}&password=${payload.password}`);
      if (status == 200) {
        onSuccess(data?.details);
        return data;
      }
      else {
        // toast.warning(data?.details);
        return thunkAPI.rejectWithValue(response);
      }
    } catch (error) {
      // const errorMessage = error.response?.data?.details;
      toast.warning(error.response?.data?.details);
      // toast.warning(data?.details);
      return thunkAPI.rejectWithValue(error);
    }
  }
);


