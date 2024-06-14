import { createSlice } from '@reduxjs/toolkit'
import { getLeadAction,deleteLeadAction } from './leadThunk'

const initialState = {
  isLoading: false,
  deleteLoader:false,
  getLead: [],
}

export const leadSlice = createSlice({
  name: 'lead',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      //getLead
      .addCase(getLeadAction.pending, (state, action) => {
        state.isLoading = true
      })

      .addCase(getLeadAction.fulfilled, (state, action) => {
        state.isLoading = false
        state.getLead = action.payload
      })
      .addCase(getLeadAction.rejected, (state, action) => {
        state.isLoading = false
      })
      .addCase(deleteLeadAction.pending, (state, action) => {
        state.deleteLoader = true
      })

      .addCase(deleteLeadAction.fulfilled, (state, action) => {
        state.deleteLoader = false
      })
      .addCase(deleteLeadAction.rejected, (state, action) => {
        state.deleteLoader = false
      })

  },
})


export default leadSlice.reducer
