import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type OrderBookEntry = {
  count: number;
  amount: number;
  total: number;
  price: number;
};

export interface OrderBookState {
  bids: OrderBookEntry[];
  asks: OrderBookEntry[];
}

const initialState: OrderBookState = {
  bids: [],
  asks: [],
};

const orderBookSlice = createSlice({
  name: 'orderBook',
  initialState,
  reducers: {
    setOrderBookData: (state, action: PayloadAction<OrderBookState>) => {
      state.bids = action.payload.bids;
      state.asks = action.payload.asks;
    },
  },
});

export const { setOrderBookData } = orderBookSlice.actions;

export const selectOrderBook = (state: any) => state.orderBook;

export default orderBookSlice.reducer;
