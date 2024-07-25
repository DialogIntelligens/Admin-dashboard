import { createSlice } from '@reduxjs/toolkit'
import {
  getAnalyticsAction,
  getAgentChatAction,
  getAgentChatActionTwo,
  getAIChatAction,
  getAIChatActionTwo,
} from './chatThunk'

const initialState = {
  isLoading: false,
  chatLoader: false,
  loaderTwo: false,
  getAnalytics: [],
  getChat: [],
  getAIChatLoader: false,
  getAIChatLoader2: false,
  getAIChat: [],
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      //getAnayltics
      .addCase(getAnalyticsAction.pending, (state, action) => {
        state.isLoading = true
      })

      .addCase(getAnalyticsAction.fulfilled, (state, action) => {
        state.isLoading = false
        state.getAnalytics = action.payload
      })
      .addCase(getAnalyticsAction.rejected, (state, action) => {
        state.isLoading = false
      })
      .addCase(getAgentChatAction.pending, (state, action) => {
        state.chatLoader = true
      })

      .addCase(getAgentChatAction.fulfilled, (state, action) => {
        state.chatLoader = false
        state.getChat = action.payload
      })
      .addCase(getAgentChatAction.rejected, (state, action) => {
        state.chatLoader = false
      })

      .addCase(getAgentChatActionTwo.pending, (state, action) => {
        state.loaderTwo = true
      })
      .addCase(getAgentChatActionTwo.fulfilled, (state, action) => {
        state.loaderTwo = false
        state.getChat = action.payload
      })
      .addCase(getAgentChatActionTwo.rejected, (state, action) => {
        state.loaderTwo = false
      })

      .addCase(getAIChatAction.pending, (state, action) => {
        state.getAIChatLoader = true
      })
      .addCase(getAIChatAction.fulfilled, (state, action) => {
        state.getAIChatLoader = false
        state.getAIChat = action.payload
      })
      .addCase(getAIChatAction.rejected, (state, action) => {
        state.getAIChatLoader = false
      })

      .addCase(getAIChatActionTwo.pending, (state, action) => {
        state.getAIChatLoader2 = true
      })
      .addCase(getAIChatActionTwo.fulfilled, (state, action) => {
        state.getAIChatLoader2 = false
        state.getAIChat = action.payload
      })
      .addCase(getAIChatActionTwo.rejected, (state, action) => {
        state.getAIChatLoader2 = false
      })
  },
})

export default chatSlice.reducer
