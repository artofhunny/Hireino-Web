import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
    name: "company",
    initialState: null,
    reducers: {
        addCompanies: (state, action) => action.payload,
        addCompany: (state, action) => {
            state.push(action.payload);
        }
    }
});

export const { addCompanies, addCompany } = companySlice.actions;
export default companySlice.reducer;