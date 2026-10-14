/*
 * Factory funtion creating game objects
 * Expects an object to be passed
 */
export default function createGame({ title, price, stock, tags = [] } = {}) {
  if (typeof price !== "number" || !Number.isFinite(price)) {
    throw new TypeError(`Price must be a valid number! Received: ${price}`);
  }

  if (!Number.isInteger(stock) || stock < 0) {
    throw new TypeError(
      `The stock value must be a non-negative number! Received: ${stock}`,
    );
  }

  if (!Array.isArray(tags)) {
    throw new TypeError(`Tags must be an array! Received: ${tags}`);
  }

  if (tags.length === 0) {
    throw new TypeError(
      `Tags must contain at least one item! Received: ${tags}`,
    );
  }

  // When I need to perform date operations for dateAdded
  // I should convert it back to a Date object
  // const date = new Date(dateAdded);
  const DATE_ADDED = new Date().toISOString();
  const GAME_ID = crypto.randomUUID();

  const getDateAdded = () => {
    // Returns string value - Immutable
    return DATE_ADDED;
  };

  const getGameId = () => {
    // Returns string value -> Immutable
    return GAME_ID;
  };

  const getStock = () => {
    // Returns number -> Immutable
    return stock;
  };

  const addStock = (quantity) => {
    if (!Number.isInteger(quantity) || quantity <= 0) {
      throw new TypeError(
        `Quantity must be a positive number greater than 1! Received: ${typeof quantity} : ${quantity}`,
      );
    }

    stock = stock + quantity;
  };

  const removeStock = (quantity) => {
    if (!Number.isInteger(quantity) || quantity <= 0) {
      throw new TypeError(
        `Quantity must be a positive number greater than 1! Received: ${typeof quantity} : ${quantity}`,
      );
    }

    // Only remove stocks if it's more or equal to quantity.
    if (quantity > stock) {
      throw new Error(
        `Insufficient: ${quantity} is greater than the available stocks! (STOCK: ${stock})`,
      );
    }

    return (stock = stock - quantity);
  };

  return {
    title,
    price,
    tags,
    getDateAdded,
    getGameId,
    getStock,
    addStock,
    removeStock,
  };
}

const entry = {
  title: "Hello: Test",
  price: 54.23,
  stock: 24,
  tags: ["RPG", "MOBA"],
};

const newGame = createGame(entry);

// console.log(newGame);
// console.log(newGame.getDateAdded());
// console.log(newGame.getGameId());
// console.log(newGame.getStock());
// newGame.addStock(2);
// console.log(newGame.getStock());
// newGame.removeStock(10);
// console.log(newGame.getStock());
// console.log((newGame.stock = 245)); // I noticed that this actually adds a new property on the returned object.
// console.log(newGame.getStock());

// console.log(newGame);
