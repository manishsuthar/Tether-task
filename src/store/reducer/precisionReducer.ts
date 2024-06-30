
export const SET_PRECISION = 'precision/setPrecision';

const initialState = {
  precision: 2,
};

const precisionReducer = (state = initialState, action:any) => {
  switch (action.type) {
    case SET_PRECISION:
      return {
        ...state,
        precision: action.payload,
      };
    default:
      return state;
  }
};

export default precisionReducer;
