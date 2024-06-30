import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PrecisionState {
  precision: number;
}

const initialState: PrecisionState = {
  precision: 2,
};

export const precisionSlice = createSlice({
  name: 'precision',
  initialState,
  reducers: {
    setPrecision: (state, action: PayloadAction<number>) => {
      state.precision = action.payload;
    },
  },
});

export const { setPrecision } = precisionSlice.actions;

export const selectPrecision = (state: any) => state.precision.precision;

export default precisionSlice.reducer;
