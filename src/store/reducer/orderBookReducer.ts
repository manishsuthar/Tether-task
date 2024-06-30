
export const SET_ORDER_BOOK_DATA = 'orderBook/setOrderBookData';

const initialState = {
  bids: [],
  asks: [],
};

// Reducer Function
const orderBookReducer = (state = initialState, action:any) => {
  switch (action.type) {
    case SET_ORDER_BOOK_DATA:
      return {
        ...state,
        bids: action.payload.bids,
        asks: action.payload.asks,
      };
    default:
      return state;
  }
};

export default orderBookReducer;
