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
        onSuccess();
        toast.success("Successfully Login");
        return data;
      }
      else {
        toast.warning(data?.details);
        return thunkAPI.rejectWithValue(response);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.details || "Server error";
      toast.warning(errorMessage);
      // toast.warning(data?.details);
      return thunkAPI.rejectWithValue(error);
    }
  }
);


