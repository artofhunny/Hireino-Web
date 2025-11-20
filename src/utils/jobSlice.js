import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: null,
    job: null,
  },
  reducers: {
    addAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    addJob: (state, action) => {
        state.job = action.payload;
    },
    unsaveJob: (state, action) => {
      const jobId = action.payload;
      state.allJobs = state.allJobs.map(job => {
        return job._id === jobId
              ? { ...job, isSaved: false } : job;
      });
    },
    saveJob: (state, action) => {
      const jobId = action.payload;
      state.allJobs = state.allJobs.map(job => {
        return job._id === jobId
              ? { ...job, isSaved: true } : job;
      });
    },
    deleteJobFromJobs: (state, action) => {
      const updatedJobs = state.allJobs.filter(job => {
        return job._id !== action.payload;
      });
      state.allJobs = updatedJobs;
    },

  },
});

export const { addAllJobs, addJob, unsaveJob, saveJob, deleteJobFromJobs } = jobSlice.actions;
export default jobSlice.reducer;
