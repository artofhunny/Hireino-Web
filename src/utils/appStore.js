import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import jobReducer from "./jobSlice";
import myJobsReducer from "./Myjobs";
import companyReducer from "./companySlice";
import savedJobsReducer from "./savedJobsSlice";

const appStore = configureStore({
    reducer: {
        user: userReducer,
        job: jobReducer,
        myJobs: myJobsReducer,
        company: companyReducer,
        savedJobs: savedJobsReducer,
    },
});

export default appStore;