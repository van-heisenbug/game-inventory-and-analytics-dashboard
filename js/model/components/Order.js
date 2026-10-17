// # IMPORTS
import { Game } from "../components/Game.js";
import { LineItem } from "../components/LineItem.js";

// # ORDER FACTORY
export function Order({ buyerId, paymentMethod, lineItem = [] } = {}) {
  const id = crypto.randomUUID();
  const date = new Date().toISOString();
  let totalCost = null;
  let status = null;

  // # READ
  const getId = () => id;
  const getBuyerId = () => buyerId;
  const getDate = () => date;
  const getPaymentMethod = () => paymentMethod;
  const getStatus = () => status;

  // Order model only spits out a copy.
  const getLineItem = () => {
    return structuredClone(lineItem);
  };

  const getTotalCost = () => {
    // Loop through all lineItems and grab all line item's subTotal
    totalCost = lineItem.reduce((accumulator, currentSubTotal) => {
      return accumulator + currentSubTotal.getSubTotal();
    }, 0);

    return totalCost;
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
    getTotalCost,
  };
}

const line1 = LineItem({
  gameId: "test1",
  quantity: 100,
});

const order1 = Order({
  buyerId: "testbuyer",
  paymentMethod: "PayPal",
  lineItem: [line1],
});

console.log(order1.getStatus());
console.log(order1.getTotalCost());
