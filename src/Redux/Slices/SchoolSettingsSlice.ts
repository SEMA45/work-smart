import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const selectedCurrrenyInitialState =
  window.localStorage.getItem("selectedCurrency");
const currenciesInitialState = window.localStorage.getItem("currencies");
const periodsInitialState = window.localStorage.getItem("periods");
const schoolObjInitialState = window.localStorage.getItem("schoolObj");
const selectedTermInitialState = window.localStorage.getItem("selectedTerm");

interface InitialInterface {
  currencies: any[];
  selectedCurrency: any;
  periods_terms: any[];
  schoolObj: any;
  selectedTerm:any;
}

const initialState: InitialInterface = {
  currencies: currenciesInitialState
    ? JSON.parse(currenciesInitialState)
    : [
        { name: "usd", symbol: "$", rate_multiplier: 1 },
        { name: "zar", symbol: "ZAR", rate_multiplier: 18.2 },
        { name: "rtg", symbol: "ZWD", rate_multiplier: 2.5 },
      ],
  periods_terms: periodsInitialState
    ? JSON.parse(periodsInitialState)
    : [{ name: "term one" }, { name: "term two" }, { name: "term three" }],
  schoolObj: schoolObjInitialState ? JSON.parse(schoolObjInitialState) : {},
  selectedCurrency: selectedCurrrenyInitialState
    ? JSON.parse(selectedCurrrenyInitialState)
    : {
        name: "usd",
        symbol: "$",
        rate_multiplier: 1,
      },
  selectedTerm: selectedTermInitialState
    ? JSON.parse(selectedTermInitialState)
    : ["term one" , "term two" , "term three" ],
};

const SchoolSettingsSlice = createSlice({
  name: "SchoolSettings",
  initialState,
  reducers: {
    addCurrencies: (state, action: PayloadAction<string[] | any[]>) => {
      state.currencies = action.payload;
    },
    addPeriods: (state, action: PayloadAction<string[] | any[]>) => {
      state.periods_terms = action.payload;
    },
    updateSchool_Obj: (state, action: PayloadAction<string[] | any[]>) => {
      state.schoolObj = action.payload;
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
    selectTerm:(state, action: PayloadAction<string[] | any[]>)=>{
      state.selectedTerm = action.payload
    }
  },
});
export const {
  addCurrencies,
  selectCurrency,
  addPeriods,
  updateSchool_Obj,
  selectTerm,
} = SchoolSettingsSlice.actions;

export default SchoolSettingsSlice.reducer;
