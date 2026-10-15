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
      `The stock value must be a non-negative integer! Received: ${stock}`,
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

  const getTitle = () => {
    return title;
  };

  const setTitle = (newTitle) => {
    title = newTitle;
  };

  const getPrice = () => {
    return price;
  };

  const setPrice = (newPrice) => {
    if (typeof newPrice !== "number" || !Number.isFinite(newPrice)) {
      throw new TypeError(
        `newPrice must be a valid number! Received: ${newPrice}`,
      );
    }

    price = Math.round(newPrice * 100);
  };

  const getTags = () => {
    return structuredClone(tags);
  };

  const addTags = (newTags) => {
    if (!Array.isArray(newTags)) {
      throw new TypeError(`newTags must be an array! Received: ${newTags}`);
    }

    if (newTags.length === 0) {
      throw new TypeError(
        `newTags must contain at least one item! Received: ${newTags}`,
      );
    }

    const cleanedNewTags = cleanTags(newTags);

    // Spread operator
    // Because it's a function call
    // Remember this: The opposite of Spread is Rest
    tags.push(...cleanedNewTags);
  };

  const removeTag = (tagName) => {
    const tagPosition = tags.indexOf(tagName);

    // Because indexOf() may return -1
    // Only remove if tag really exists
    if (tagPosition !== -1) {
      tags.splice(tagPosition, 1);
    }
  };

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
        `Quantity must be a positive number greater than 0! Received: ${typeof quantity} : ${quantity}`,
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
    getTitle,
    setTitle,
    getPrice,
    setPrice,
    getTags,
    addTags,
    removeTag,
    getDateAdded,
    getGameId,
    getStock,
    addStock,
    removeStock,
  };
}

// I already have a function like this in the View
// Just copying for now. Will refactor later.
// For tags
// Returns an array of valid string tags
function cleanTags(rawTags) {
  if (!Array.isArray(rawTags)) {
    throw new TypeError(`Tags must be an array! Received: ${rawTags}`);
  }

  if (rawTags.length === 0) {
    throw new TypeError(
      `Tags must contain at least one item! Received: ${rawTags}`,
    );
  }

  // If the rawTags is an array with at least one value. Continue below.

  // If there are invalid tags, return them as invalidTags
  const invalidTags = rawTags.filter(
    // I'll keep the instanceof because it made me learn the difference
    // between && and ||
    (tag) => typeof tag !== "string" && !(tag instanceof String),
  );

  // If there are invalid tags.
  if (invalidTags.length !== 0) {
    throw new TypeError(
      `Tags should be an array of strings! Invalid Tags: ${invalidTags}`,
    );
  }

  // If rawTags are all strings, trim spaces
  const tags = rawTags.map((tag) => tag.trim().replace(/\s+/g, " "));

  return tags;
}

const entry = {
  title: "Hello: Test",
  price: 54.23,
  stock: 24,
  tags: ["RPG", "MOBA"],
};

const newGame = createGame(entry);

// console.log(newGame.getTags());
console.log(newGame.getPrice());
newGame.setPrice(4598876.23);
console.log(newGame.getPrice());
// newGame.addTags(["Team Play", "Dota 2", "PlayerIO", "Test"]);
// console.log(newGame.getTags());
// newGame.removeTag("Team Play");
// console.log(newGame.getTags());
// newGame.addTags(["232", "/241", "  . ;,;;/", "testing"]);
// console.log(newGame.getTags());
// console.log(newGame.getPrice());
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
