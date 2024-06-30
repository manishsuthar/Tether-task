import { configureStore } from '@reduxjs/toolkit';
import orderBookReducer from './reducer/orderBookReducer';
import websocketReducer from './reducer/websocketReducer';
import precisionReducer from './reducer/precisionReducer';

export const store = configureStore({
  reducer: {
    orderBook: orderBookReducer,
    websocket: websocketReducer,
    precision: precisionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
