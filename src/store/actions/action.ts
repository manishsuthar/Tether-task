import { SET_ORDER_BOOK_DATA } from "../reducer/orderBookReducer";
import { SET_PRECISION } from "../reducer/precisionReducer";
import { SET_CONNECTED, SET_DISCONNECTED } from "../reducer/websocketReducer";

export const setConnected = () => ({
  type: SET_CONNECTED,
});

export const setDisconnected = () => ({
  type: SET_DISCONNECTED,
});

export const setPrecision = (precision: any) => ({
  type: SET_PRECISION,
  payload: precision,
});

export const setOrderBookData = (orderBookData: any) => ({
  type: SET_ORDER_BOOK_DATA,
  payload: orderBookData,
});
