import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const payments_record = window.localStorage.getItem("payments_record");
const credits_record = window.localStorage.getItem("credits");
const students = window.localStorage.getItem("students");
const users_team = window.localStorage.getItem("users_team");

interface InitialInterface {
  payments_record: any[];
  students: any;
  users_team: any[];
  credits_record: any[];
}

const initialState: InitialInterface = {
  payments_record: payments_record ? JSON.parse(payments_record) : [],
  credits_record: credits_record ? JSON.parse(credits_record) : [],
  students: students ? JSON.parse(students) : [],
  users_team: users_team ? JSON.parse(users_team) : [],
};

const School_DataSlice = createSlice({
  name: "SchoolData",
  initialState,
  reducers: {
    updatePayments_Data: (state, action: PayloadAction<string[] | any[]>) => {
      state.payments_record = action.payload;
    },
    updateCredits_Data: (state, action: PayloadAction<string[] | any[]>) => {
      state.credits_record = action.payload;
    },
    updateStudents_Data: (state, action: PayloadAction<string[] | any[]>) => {
      state.students = action.payload;
    },
    updateUsers_Data: (state, action: PayloadAction<string[] | any[]>) => {
      state.users_team = action.payload;
    },
  },
});
export const {
  updatePayments_Data,
  updateStudents_Data,
  updateUsers_Data,
  updateCredits_Data,
} = School_DataSlice.actions;

export default School_DataSlice.reducer;
