import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SupportFormData {
  fullName: string;
  email: string;
  issueType: string;
  tags: string[];
  steps: { step: string }[];
}

export const initialState: SupportFormData = {
  fullName: "",
  email: "",
  issueType: "Bug Report",
  tags: [],
  steps: [{ step: "" }],
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    submitForm(_, action: PayloadAction<SupportFormData>) {
      return action.payload;
    },
  },
});

export const { submitForm } = formSlice.actions;
export default formSlice.reducer;
