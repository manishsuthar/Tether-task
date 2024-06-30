import { Dispatch } from 'redux';
import { OrderBookEntry, setOrderBookData } from '../store/slice/orderBookSlice';
import { store } from '../store/store';

type SnapshotEntry = [number, number, number];

export type OrderBookUpdate =
  | [number, SnapshotEntry[]]
  | [number, SnapshotEntry];

export const handleOrderBookUpdate = (
  data: OrderBookUpdate,
  dispatch: Dispatch,
) => {
  if (Array.isArray(data[1])) {
    if (Array.isArray(data[1][0])) {
      handleSnapshot(data[1] as SnapshotEntry[], dispatch);
    } else {
      handleIndividualUpdate(data[1] as unknown as SnapshotEntry);
    }
  }
};

const handleSnapshot = (snapshot: SnapshotEntry[], dispatch: Dispatch) => {
  const bids: OrderBookEntry[] = [];
  const asks: OrderBookEntry[] = [];

  snapshot.forEach((entry) => {
    const [price, count, amount] = entry;
    const order = {
      price,
      count,
      amount,
      total: Math.abs(count * amount),
    };
    if (amount > 0) {
      bids.push(order);
    } else {
      asks.push(order);
    }
  });

  bids.sort((a, b) => a.price - b.price);
  asks.sort((a, b) => a.price - b.price);

  dispatch(setOrderBookData({ bids, asks }));
};

const handleIndividualUpdate = (update: SnapshotEntry) => {
  const [price, count, amount] = update;
  const order = {
    price,
    count,
    amount,
    total: Math.abs(count * amount),
  };

  store.dispatch((dispatch:any, getState:any) => {
    let { bids, asks } = getState().orderBook;

    bids = [...bids];
    asks = [...asks];
    if (amount > 0) {
      const index = bids.findIndex((bid:any) => bid.price === price);
      if (index !== -1) {
        if (count === 0) {
          bids.splice(index, 1);
        } else {
          bids[index] = order;
        }
      } else if (count !== 0) {
        bids.push(order);
        bids.sort((a:any, b:any) => a.price - b.price);
      }
    } else {
      const index = asks.findIndex((ask:any) => ask.price === price);
      if (index !== -1) {
        if (count === 0) {
          asks.splice(index, 1);
        } else {
          asks[index] = order;
        }
      } else if (count !== 0) {
        asks.push(order);
        asks.sort((a:any, b:any) => a.price - b.price);
      }
    }
    dispatch(setOrderBookData({ bids, asks }));
  });
};
