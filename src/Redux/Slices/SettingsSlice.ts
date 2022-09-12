import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialStateType {
  settings: string[] | any[];
  company_details: string[] | any;
}

const initialState: InitialStateType = {
  company_details: [],
  settings: [],
};

export const SettingsSlice = createSlice({
  name: "SettingsData",
  initialState,
  reducers: {
    loadSettings: (state, action: PayloadAction<any[]>) => {
      state.settings = action.payload;
    },
    setCompanyDetails: (state, action: PayloadAction<any[]>) => {
      state.company_details = action.payload;
    },
  },
});

export const {
  loadSettings,setCompanyDetails
} = SettingsSlice.actions;

export default SettingsSlice.reducer;
