import { createSlice } from "@reduxjs/toolkit";

const myJobsSlice = createSlice({
    name: "myJobs",
    initialState: [],
    reducers: {
        addMyJobs: (state, action) => action.payload,
        deleteJob: (state, action) => {
            const updatedJobs = state.filter(job => job._id !== action.payload);
            return updatedJobs;
        }
    }
});

export const { addMyJobs, deleteJob } = myJobsSlice.actions;
export default myJobsSlice.reducer;