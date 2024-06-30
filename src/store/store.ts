import { configureStore } from '@reduxjs/toolkit';
import orderBookReducer from '../store/slice/orderBookSlice';
import websocketReducer from '../store/slice/websocketSlice';
import precisionReducer from '../store/slice/precisionSlice';

export const store = configureStore({
  reducer: {
    orderBook: orderBookReducer,
    websocket: websocketReducer,
    precision: precisionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
