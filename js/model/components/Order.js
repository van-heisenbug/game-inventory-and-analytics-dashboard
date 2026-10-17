// # IMPORTS

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
