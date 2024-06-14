// import { axiosInstance } from "./../../utils/axios";
import axiosInstance from "../../utils/axios"
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";


export const getLeadAction = createAsyncThunk(
  "lead/getLead",
  async ({page,showRecord}, thunkAPI) => {
    try {
      const {data,status} = await axiosInstance.post(`/lead/get-lead-data?page=${page}&page_size=${showRecord}`);
      if (status == 200) {
        // onSuccess();
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
export const deleteLeadAction = createAsyncThunk(
  "lead/deleteLead",
  async ({Id,onSuccess}, thunkAPI) => {
    try {
      const {data,status} = await axiosInstance.post(`/lead/delete-lead?lead_id=${Id}`);
      if (status == 200) {
        onSuccess();
        toast.success(data?.details);
        return data?.details;
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


