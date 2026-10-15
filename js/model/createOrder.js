/*
 * Model to create order objects.
 */

export default function createOrder({
  buyerId,
  paymentMethod,
  lineItem = [],
} = {}) {
  const ORDER_ID = crypto.randomUUID();
  const DATE_CREATED = new Date().toISOString();
  let totalCost = null;

  const getOrderId = () => {
    return ORDER_ID;
  };

  const getBuyerId = () => {
    return buyerId;
  };

  const getDateCreated = () => {
    return DATE_CREATED;
  };

  const getLineItem = () => {
    // Recommended by chatGPT and Gemini over manual cloning
    return structuredClone(lineItem);
  };

  // TODO================= Will replace this entire line
  // Using Array.reduce()
  const getTotalCost = () => {
    // Check if line item is an array
    if (!Array.isArray(lineItem)) {
      throw new TypeError(
        `Line items should be an array of games! Received: ${lineItem}`,
      );
    }

    // Check if line item is empty
    if (lineItem.length === 0) {
      throw new Error(`Line items should not be empty! No game selected!`);
    }

    // Loop and convert price from decimal to cents
    // add all of them and return as totalCost
    totalCost = lineItem.reduce((sumOfCurrentItemSubTotal, currentItem) => {
      // Check price if it's a valid number.
      if (
        typeof currentItem.subTotal !== "number" ||
        !Number.isFinite(currentItem.subTotal)
      ) {
        throw new TypeError(
          `subTotal must be a valid number! Received: ${currentItem.subTotal}`,
        );
      }

      // Check if quantity is a valid number.
      if (
        !Number.isSafeInteger(currentItem.quantity) ||
        currentItem.quantity < 1
      ) {
        throw new TypeError(
          `Quantity must be a non-negative integer. Received: ${currentItem.quantity}`,
        );
      }

      console.log(currentItem);

      // Actual calculation.
      // converting to cents for precision as per AI. Haha
      const currentItemSubTotalInCents = currentItem.subTotal * 100;

      return sumOfCurrentItemSubTotal + currentItemSubTotalInCents;
    }, 0);

    // returning the totalCost here.
    // converting back to decimal'
    // I should have just probably use cents internally
    // and use decimal only for display
    return totalCost / 100;
  };
  // TODO================= Will replace this entire line
  // This is incorrect. I will need to check first if the game ordered
  // from the view actually exists internally
  // I should also be calculating in cents and only use decimal for diplay

  return {
    getBuyerId,
    paymentMethod,
    getOrderId,
    getDateCreated,
    getTotalCost,
    getLineItem,
  };
}

const entry = createOrder({
  buyerId: 43,
  paymentMethod: "PayPal",
  lineItem: [
    {
      gameId: 3,
      quantity: 2,
    },
    {
      gameId: 4,
      quantity: 1,
    },
  ],
});

// console.log(entry);
console.log(entry.getTotalCost());
