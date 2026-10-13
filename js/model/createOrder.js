/*
 *
 */

export default function createOrder({ lineItem = {}, buyer = {} } = {}) {
  const id = crypto.randomUUID();
  const purchaseDate = null;
  const totalCost = null;

  return {
    id,
    lineItem,
    totalCost,
    purchaseDate,
    buyer,
  };
}

// lineItem sounds like anoher object I have to build
