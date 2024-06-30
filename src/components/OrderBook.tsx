import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import WebSocketService from "../sevices/WebSocketService";
import { selectOrderBook } from "../store/slice/orderBookSlice";
import { selectPrecision } from "../store/slice/precisionSlice";
import {
  selectIsConnected,
  setConnected,
  setDisconnected,
} from "../store/slice/websocketSlice";
import Toggle from "./Toggle";

const OrderBook: React.FC = () => {
  const orderBook = useSelector(selectOrderBook);
  const precision = useSelector(selectPrecision);
  const isConnected = useSelector(selectIsConnected);
  const dispatch = useDispatch();
  const websocketService = WebSocketService.getInstance(dispatch);

  useEffect(() => {
    if (isConnected) {
      websocketService.connect();
    } else {
      websocketService.disconnect();
    }

    return () => {
      websocketService.disconnect();
    };
  }, [websocketService, isConnected]);

  const handleConnectClick = () => {
    dispatch(setConnected());
  };

  const handleDisconnectClick = () => {
    dispatch(setDisconnected());
  };

  return (
    <div className="container">
      <div className="title-container">
        <div>
          <h2 className="title">
            ORDER BOOK <span className="sub-title ">BTC/USD</span>
          </h2>
        </div>
      </div>

      <table className="table">
        <thead className="table-header">
          <tr>
            <th colSpan={4}>Bids</th>
            <th colSpan={4}>Asks</th>
          </tr>
          <tr>
            <th className="table-column-header">COUNT</th>
            <th className="table-column-header">AMOUNT</th>
            <th className="table-column-header">TOTAL</th>
            <th className="table-column-header">PRICE</th>
            <th className="table-column-header">PRICE</th>
            <th className="table-column-header">TOTAL</th>
            <th className="table-column-header">AMOUNT</th>
            <th className="table-column-header">COUNT</th>
          </tr>
        </thead>
        <tbody>
          {orderBook.bids.map((bid: any, i: any) => (
            <tr key={i}>
              <td>{bid.count}</td>
              <td>{bid.amount.toFixed(4)}</td>
              <td>{bid.total.toFixed(4)}</td>
              <td>{bid.price.toFixed(precision)}</td>
              <td>
                {orderBook.asks[i]
                  ? orderBook.asks[i].price.toFixed(precision)
                  : ""}
              </td>
              <td>
                {orderBook.asks[i] ? orderBook.asks[i].total.toFixed(4) : ""}
              </td>
              <td>
                {orderBook.asks[i] ? orderBook.asks[i].amount.toFixed(4) : ""}
              </td>
              <td>{orderBook.asks[i] ? orderBook.asks[i].count : ""}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="footer">
        <div className="connect-button">
          <Toggle on={handleConnectClick} off={handleDisconnectClick} />
        </div>
      </div>
    </div>
  );
};

export default OrderBook;
