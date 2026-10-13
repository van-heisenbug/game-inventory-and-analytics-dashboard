/*
 * Factory funtion creating game objects
 * Expects an object to be passed
 */
export default function createGame({ title, price, stock, tags = [] } = {}) {
  const id = crypto.randomUUID();

  return {
    id,
    title,
    price,
    stock,
    tags,
  };
}
