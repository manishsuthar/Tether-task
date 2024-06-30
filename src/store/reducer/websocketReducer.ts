import { createSlice } from '@reduxjs/toolkit';

interface WebsocketState {
  isConnected: boolean;
}

const initialState: WebsocketState = {
  isConnected: false,
};

export const websocketSlice = createSlice({
  name: 'websocket',
  initialState,
  reducers: {
    setConnected: (state:any) => {
      state.isConnected = true;
    },
    setDisconnected: (state:any) => {
      state.isConnected = false;
    },
  },
});

export const { setConnected, setDisconnected } = websocketSlice.actions;

export const selectIsConnected = (state: any) =>
  state.websocket.isConnected;

export default websocketSlice.reducer;
