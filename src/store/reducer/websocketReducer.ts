export const SET_CONNECTED = 'websocket/setConnected';
export const SET_DISCONNECTED = 'websocket/setDisconnected';

interface WebsocketState {
    isConnected: boolean;
}

const initialState: WebsocketState = {
  isConnected: false,
};

const websocketReducer = (state = initialState, action:any) => {
  switch (action.type) {
    case SET_CONNECTED:
      return {
        ...state,
        isConnected: true,
      };
    case SET_DISCONNECTED:
      return {
        ...state,
        isConnected: false,
      };
    default:
      return state;
  }
};

export default websocketReducer;
