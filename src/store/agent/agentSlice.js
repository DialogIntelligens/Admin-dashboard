import { createSlice } from '@reduxjs/toolkit'
import { createAgentAction,AgentStatusAction } from './agentThunk'

const initialState = {
  isLoading: false,
  getLoader:false,
  statusLoader:false,
  getAgent: [],
}

export const agentSlice = createSlice({
  name: 'agent',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      //create Agent
      .addCase(createAgentAction.pending, (state, action) => {
        state.isLoading = true
      })

      .addCase(createAgentAction.fulfilled, (state, action) => {
        state.isLoading = false
      })
      .addCase(createAgentAction.rejected, (state, action) => {
        state.isLoading = false
      })
      //update agent status
      .addCase(AgentStatusAction.pending, (state, action) => {
        state.statusLoader = true
      })

      .addCase(AgentStatusAction.fulfilled, (state, action) => {
        state.statusLoader = false
      })
      .addCase(AgentStatusAction.rejected, (state, action) => {
        state.statusLoader = false
      })
  },
})


export default agentSlice.reducer
