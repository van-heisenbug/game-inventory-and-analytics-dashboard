// # IMPORTS
import { STOCK_CHANGE_REASON } from "../constants/stockChangeReason.js";

// # GAME FACTORY
export function Game({ name, stock, price, genre, testId } = {}) {
  // # MUTABLE
  const stockHistory = [];

  // # Check README.md
  recordStockChange({
    quantity: stock,
    reason: STOCK_CHANGE_REASON.INITIAL_STOCK,
  });

  // const id = crypto.randomUUID();
  const id = testId;

  // # READ
  const getId = () => id;
  const getName = () => name;
  const getGenre = () => genre;
  const getPriceInCents = () => price;
  const getStock = () => stock;
  const getStockHistory = () => structuredClone(stockHistory);

  // # MUTATE

  // !!! TODO - Will need to ensure new values passed are safe for mutation

  const setName = (newName) => {
    name = newName;
  };

  const setGenre = (newGenre) => {
    genre = newGenre;
  };

  const setPriceInCents = (newPrice) => {
    price = newPrice;
  };

  const addStock = (count, addReason) => {
    stock += count;

    // # MUTABLE
    const stockChange = {
      quantity: count,
      reason: addReason.replace(" ", "_").toUpperCase(),
    };

    recordStockChange(stockChange);
  };

  const removeStock = (count, removeReason) => {
    // !!! TODO - This is not enough validation
    if (count > stock) {
      throw new Error(`Insufficient stocks!`);
    }

    stock -= count;

    // # MUTABLE
    const stockChange = {
      quantity: count,
      reason: removeReason.replace(" ", "_").toUpperCase(),
    };

    recordStockChange(stockChange);
  };

  // # Check README.md
  function recordStockChange(stockChange = {}) {
    // !!! TODO - This is no validation here yet

    // Check README.md
    const stockChangeClone = {
      ...stockChange,
      date: new Date().toISOString(),
    };

    stockHistory.push(stockChangeClone);
  }

  return {
    getId,
    getName,
    setName,
    getGenre,
    setGenre,
    getPriceInCents,
    setPriceInCents,
    getStock,
    getStockHistory,
    addStock,
    removeStock,
  };
}

// const entry = {
//   name: "Dota 2",
//   stock: 24,
//   price: 2452,
//   genre: "RPG",
// };

// const game1 = Game(entry);
// console.log(game1.getStock());
// console.log(game1.getStockHistory());
// game1.addStock(6, STOCK_CHANGE_REASON.RESTOCK);
// console.log(game1.getStock());
// console.log(game1.getStockHistory());
// console.log(game1.removeStock(30, STOCK_CHANGE_REASON.SALE));
// console.log(game1.getStock());
// console.log(game1.getStockHistory());
// game1.removeStock(1);
// console.log(game1.getStock());
