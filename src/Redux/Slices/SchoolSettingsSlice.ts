import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const selectedCurrrenyInitialState =
  window.localStorage.getItem("selectedCurrency");

interface InitialInterface {
  currencies: any[];
  selectedCurrency: any;
}

const initialState: InitialInterface = {
  currencies: [
    { name: "usd", symbol: "$", rate_multiplier: 1 },
    { name: "zar", symbol: "ZAR", rate_multiplier: 1.5 },
    { name: "rtg", symbol: "ZWD", rate_multiplier: 2.5 },
  ],
  selectedCurrency: selectedCurrrenyInitialState
    ? JSON.parse(selectedCurrrenyInitialState)
    : {
        name: "usd",
        symbol: "$",
        rate_multiplier: 1,
      },
};

const SchoolSettingsSlice = createSlice({
  name: "SchoolSettings",
  initialState,
  reducers: {
    loadSchoolSettings: (state, action: PayloadAction<string[] | any[]>) => {
      state.currencies = action.payload;
    },
    selectCurrency: (
      state,
      action: PayloadAction<{
        name: string;
        symbol: string;
        rate_multiplier: number;
      }>
    ) => {
      state.selectedCurrency = action.payload;
    },
  },
});
export const { loadSchoolSettings, selectCurrency } =
  SchoolSettingsSlice.actions;

export default SchoolSettingsSlice.reducer;
