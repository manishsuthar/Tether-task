import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import WebSocketService from "../sevices/WebSocketService";
import Toggle from "./Toggle";
import { selectOrderBook } from "../store/reducer/orderBookReducer";
import { selectPrecision } from "../store/reducer/precisionReducer";
import {
  selectIsConnected,
  setConnected,
  setDisconnected,
} from "../store/reducer/websocketReducer";

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

  function calculatePercentage(amount:number, total:number) {
    if (isNaN(amount) || isNaN(total) || total === 0) {
      return `0%`;
    }
    let percentage = (Math.abs(amount) / total) * 100;
    return percentage.toFixed(2) + "%";
  }

  return (
    <div className="container">
      <div className="title-container">
        <div>
          <h2 className="title">
            ORDER BOOK <span className="sub-title ">BTC/USD</span>
          </h2>
        </div>
      </div>

      <div className="order-book">
        <div className="table">
          <div className="table-header">
            {/* <div className="row">
              <div className="cell" colSpan={4}>
                Bids
              </div>
              <div className="cell" colSpan={4}>
                Asks
              </div>
            </div> */}
            <div className="row">
              <div className="row-1">
                <div className="cell">COUNT</div>
                <div className="cell">AMOUNT</div>
                <div className="cell">TOTAL</div>
                <div className="cell">PRICE</div>
              </div>
              <div className="row-1">
                <div className="cell">PRICE</div>
                <div className="cell">TOTAL</div>
                <div className="cell">AMOUNT</div>
                <div className="cell">COUNT</div>
              </div>
            </div>
          </div>
          <div className="table-body">
            {orderBook.bids.map((bid: any, i: any) => (
              <div className="row" key={i}>
                <div className="row-1">
                  <div className="cell">{bid.count}</div>
                  <div className="cell">{bid.amount.toFixed(4)}</div>
                  <div className="cell">{bid.total.toFixed(4)}</div>
                  <div className="cell">{bid.price.toFixed(precision)}</div>
                  <div className="bar-left" style={{width:calculatePercentage(bid.amount,bid.total)}}/>
                </div>
                <div className="row-1">
                  <div className="cell">
                    {orderBook.asks[i]
                      ? orderBook.asks[i].price.toFixed(precision)
                      : ""}
                  </div>
                  <div className="cell">
                    {orderBook.asks[i]
                      ? orderBook.asks[i].total.toFixed(4)
                      : ""}
                  </div>
                  <div className="cell">
                    {orderBook.asks[i]
                      ? orderBook.asks[i].amount.toFixed(4)
                      : ""}
                  </div>
                  <div className="cell">
                    {orderBook.asks[i] ? orderBook.asks[i].count : ""}
                  </div>
                  {orderBook.asks[i] && <div className="bar-right" style={{width:calculatePercentage(orderBook.asks[i].amount, orderBook.asks[i].total)}}/>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="footer">
        <div className="connect-button">
          <Toggle on={handleConnectClick} off={handleDisconnectClick} />
        </div>
      </div>
    </div>
  );
};

export default OrderBook;
