/*
 * Model to create order objects.
 */

export default function createOrder({
  buyerId,
  buyerName,
  paymentMethod,
  // lineItem's subTotal is calculated from validateAndNormalizeOrderEntry()
  lineItem = [],
} = {}) {
  const ORDER_ID = crypto.randomUUID();
  const DATE_CREATED = new Date().toISOString();
  let totalCost = null;

  const getOrderId = () => {
    return ORDER_ID;
  };

  const getDateCreated = () => {
    return DATE_CREATED;
  };

  const getLineItem = () => {
    // Recommended by chatGPT and Gemini over manual cloning
    return structuredClone(lineItem);
  };

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

  return {
    buyerId,
    buyerName,
    paymentMethod,
    getOrderId,
    getDateCreated,
    getTotalCost,
    getLineItem,
  };
}

const entry = createOrder({
  buyerId: 43,
  buyerName: "Jason Bourne",
  paymentMethod: "PayPal",
  lineItem: [
    {
      gameId: 3,
      quantity: 2,
      subTotal: 90.43,
      gameTags: ["RPG"],
    },
    {
      gameId: 4,
      quantity: 1,
      subTotal: 55.12,
      gameTags: ["gameTags"],
    },
  ],
});

console.log(entry);
console.log(entry.getTotalCost());
