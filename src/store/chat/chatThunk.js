// import { axiosInstance } from "./../../utils/axios";
import axiosInstance from '../../utils/axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

export const chatAction = createAsyncThunk(
  'chat/chat',
  async ({ payload, onSuccess, onFailure }, { thunkAPI }) => {
    try {
      const { data, status } = await axiosInstance.post(`/chat/chat`, payload)
      if (status == 200) {
        onSuccess(data?.details)
        return data?.details
      } else {
        onFailure()
        toast.warning(data?.details)
        return thunkAPI.rejectWithValue(response)
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  },
)

export const getAnalyticsAction = createAsyncThunk('chat/getAnalytics', async (thunkAPI) => {
  try {
    const { data, status } = await axiosInstance.post(`/chat/get-analytics`)
    if (status == 200) {
      // onSuccess();
      return data?.details
    } else {
      toast.warning(data?.details)
      return thunkAPI.rejectWithValue(response)
    }
  } catch (error) {
    const errorMessage = error.response?.data?.details || 'Server error'
    toast.warning(errorMessage)
    return thunkAPI.rejectWithValue(error)
  }
})

export const getAgentChatAction = createAsyncThunk(
  'chat/getAgentChat',
  async ({ page, showRecord, onSuccess }, { thunkAPI }) => {
    try {
      const { data, status } = await axiosInstance.post(
        `/agent/get-all-agents?page=${page}&page_size=${showRecord}`,
      )
      if (status == 200) {
        onSuccess(data?.details)
        return data
      } else {
        toast.warning(data?.details)
        return thunkAPI.rejectWithValue(response)
      }
    } catch (error) {
      const errorMessage = error.response?.data?.details
      toast.warning(errorMessage)
      return thunkAPI.rejectWithValue(error)
    }
  },
)
export const getAgentChatActionTwo = createAsyncThunk(
  'chat/getAgentChatTwo',
  async ({ page, showRecord, onSuccess }, { thunkAPI }) => {
    try {
      const { data, status } = await axiosInstance.post(
        `/agent/get-all-agents?page=${page}&page_size=${showRecord}`,
      )
      if (status == 200) {
        onSuccess(data?.details)
        return data
      } else {
        // onFailure()
        toast.warning(data?.details)
        return thunkAPI.rejectWithValue(response)
      }
    } catch (error) {
      const errorMessage = error.response?.data?.details
      toast.warning(errorMessage)
      return thunkAPI.rejectWithValue(error)
    }
  },
)

export const getAIChatAction = createAsyncThunk(
  'chat/getAIChat',
  async ({ page, showRecord, adminID, onSuccess }, { thunkAPI }) => {
    try {
      const { data, status } = await axiosInstance.get(
        // `/chat/get-ai-chat?admin_id=${adminID}&page=${page}&page_size=${showRecord}`,
        `/chat/get-ai-chat?admin_id=${adminID}`,
      )
      if (status == 200) {
        onSuccess(data)
        return data
      } else {
        toast.warning(data?.details)
        return thunkAPI.rejectWithValue(response)
      }
    } catch (error) {
      const errorMessage = error.response?.data?.details
      toast.warning(errorMessage)
      return thunkAPI.rejectWithValue(error)
    }
  },
)
export const getAIChatActionTwo = createAsyncThunk(
  'chat/getAIChatTwo',
  async ({ page, showRecord, adminID, onSuccess }, { thunkAPI }) => {
    try {
      const { data, status } = await axiosInstance.get(
        // `/chat/get-ai-chat?admin_id=${adminID}&page=${page}&page_size=${showRecord}`,
        `/chat/get-ai-chat?admin_id=${adminID}`,
      )
      if (status == 200) {
        onSuccess(data)
        return data
      } else {
        toast.warning(data?.details)
        return thunkAPI.rejectWithValue(response)
      }
    } catch (error) {
      const errorMessage = error.response?.data?.details
      toast.warning(errorMessage)
      return thunkAPI.rejectWithValue(error)
    }
  },
)