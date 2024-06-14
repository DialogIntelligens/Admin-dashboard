import { createSlice } from '@reduxjs/toolkit'
import {getAnalyticsAction,getAgentChatAction,getAgentChatActionTwo } from './chatThunk'

const initialState = {
  isLoading: false,
  chatLoader:false,
  loaderTwo:false,
  getAnalytics: [],
  getChat:[],
  
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
     
  },
})


export default chatSlice.reducer
