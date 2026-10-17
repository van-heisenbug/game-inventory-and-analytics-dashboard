// # IMPORTS
import { ORDER_STATUS } from "../constants/orderStatus.js";
import { LineItem } from "../components/LineItem.js";

export function Order(buyerId, paymentMethod, lineItem = []) {
  const id = crypto.randomUUID();
  const date = new Date().toISOString();
  const totalCost = null;
  let status = null;

  // # READ
  const getId = () => id;
  const getBuyerId = () => buyerId;
  const getDate = () => date;
  const getPaymentMethod = () => paymentMethod;
  const getStatus = () => status;
  const getLineItem = () => {
    return structuredClone(lineItem);
  };

  // # MUTATE
  const setStatus = (newStatus) => {
    status = newStatus;
  };

  return {
    getId,
    getDate,
    getPaymentMethod,
    getBuyerId,
    getStatus,
    getLineItem,
    setStatus,
  };
}
