import { createSlice } from "@reduxjs/toolkit";

const savedJobs = createSlice({
    name: "savedJobs",
    initialState: null,
    reducers: {
        addSavedJobs: (state, action) => action.payload,
        deleteSavedJob: (state, action) => {
            const updatedJobs = state.filter(job => job?.jobId?._id !== action.payload);
            return updatedJobs;
        },
    }
});

export const { addSavedJobs, deleteSavedJob } = savedJobs.actions;
export default savedJobs.reducer;