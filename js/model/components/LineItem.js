// # IMPORTS
import { Game } from "../components/Game.js";
import { Order } from "../components/Order.js";

export function LineItem(gameId, quantity) {
  const id = crypto.randomUUID();
  let subTotal = null;

  // # READ
  const getId = () => id;
  const getGameId = () => gameId;
  const getQuantity = () => quantity;
  const getSubTotal = () => {
    // Look from localStorage
    const game0 = {
      name: "Dota 1",
      stock: 8,
      price: 2452,
      genre: "RPG",
      testId: "5b423e10-926a-24-ade4-25c83a852b61",
    };

    const game1 = {
      name: "Dota 2",
      stock: 52,
      price: 3333,
      genre: "RPG",
      testId: "5b423e10-926a-4ba3-ade4-25c83a852b61",
    };

    const game2 = {
      name: "World of Warcraft 3",
      stock: 14,
      price: 100,
      genre: "RPG",
      testId: "5b423e10-926a-4ba3-1241515-25c83a852b61",
    };

    const inventory = [];
    inventory.push(Game(game0));
    inventory.push(Game(game1));
    inventory.push(Game(game2));
    // Loop through the inventory and find the game.
    // Check README.md
    const isGameFound = inventory.find((game) => game.getId() === gameId);

    // If not found.
    if (!isGameFound) {
      throw new Error(`This game does not exist in our database.`);
    }

    // If found, check stock level.
    const inStock = isGameFound.getStock();

    // If out of stock.
    if (!inStock) {
      throw new Error(`This game is currently out of stock.`);
    }

    // If in stock. Check if stock is sufficient.
    if (quantity > isGameFound.getStock()) {
      throw new Error(
        `The game has insufficient stocks. Current stock: ${isGameFound.getStock()}`,
      );
    }

    // If game has enough stocks.
    const gamePrice = isGameFound.getPriceInCents();

    subTotal = Number(gamePrice) * Number(quantity);

    return subTotal;
  };

  // # MUTATE
  const addQuantity = (count) => {
    quantity += count;
  };

  const reduceQuantity = (count) => {
    quantity -= count;
  };

  return {
    getId,
    getGameId,
    getQuantity,
    getSubTotal,
    addQuantity,
    reduceQuantity,
  };
}

const item1 = LineItem("5b423e10-926a-4ba3-ade4-25c83a852b61", 5);
console.log(item1.getSubTotal());
