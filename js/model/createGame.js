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

  const id = crypto.randomUUID();

  return {
    id,
    title,
    price,
    stock,
    tags,
  };
}
