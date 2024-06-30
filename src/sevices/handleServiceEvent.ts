import ReconnectingWebSocket from 'reconnecting-websocket';

export interface ServiceEvent {
  event: string;
  code: number;
}

export const handleServiceEvent = (
  data: ServiceEvent,
  socket: ReconnectingWebSocket,
) => {
  if (data.event === 'info' && data.code === 20051) {
    socket.close();
  } else if (data.event === 'info' && data.code === 20060) {
    setTimeout(() => {
      socket.close();
    }, 5000);
  }
};
