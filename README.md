# Features:

<Inventory manager>

Add, remove, replace, and update game records.

### Inventory management

| Method         | Practical feature                                 |
| -------------- | ------------------------------------------------- |
| `push()`       | Add a new game                                    |
| `pop()`        | Remove the most recently added game               |
| `shift()`      | Process the oldest pending task                   |
| `unshift()`    | Add an urgent alert to the activity log           |
| `splice()`     | Remove or replace a game at a particular position |
| `fill()`       | Initialize a batch of placeholder stock slots     |
| `copyWithin()` | Copy a range of entries within a temporary array  |
| `reverse()`    | Reverse the display order                         |
| `sort()`       | Sort games by title, price, or stock              |

### Non-mutating array operations

| Method            | Practical feature                                         |
| ----------------- | --------------------------------------------------------- |
| `concat()`        | Combine inventory from two warehouses                     |
| `slice()`         | Show a page of inventory                                  |
| `toSorted()`      | Sort results without changing the original                |
| `toReversed()`    | Display recent logs first                                 |
| `toSpliced()`     | Preview an inventory change without mutating the original |
| `with()`          | Preview replacing one game record                         |
| `Array.from()`    | Convert a string or iterable into an array                |
| `Array.of()`      | Create an array of selected game IDs                      |
| `Array.isArray()` | Validate imported inventory data                          |

<Smart search>

Find games by ID, title, genre, and stock status.

### Search and filtering

| Method            | Practical feature                            |
| ----------------- | -------------------------------------------- |
| `find()`          | Find a game by ID                            |
| `findIndex()`     | Find a game's position before editing        |
| `findLast()`      | Find the last matching activity              |
| `findLastIndex()` | Locate the last matching activity's index    |
| `includes()`      | Check whether a genre or log value exists    |
| `indexOf()`       | Find the first occurrence of a selected log  |
| `lastIndexOf()`   | Find the most recent occurrence of a log     |
| `at()`            | Retrieve the newest or oldest displayed item |

<Analytics>

Calculate stock value, average prices, and sales totals.

### Analytics and data transformation

| Method          | Practical feature                              |
| --------------- | ---------------------------------------------- |
| `map()`         | Generate display objects or uppercase titles   |
| `filter()`      | Display only available or discounted games     |
| `reduce()`      | Calculate total inventory value and revenue    |
| `reduceRight()` | Build a report by processing logs backward     |
| `forEach()`     | Render records or print inventory summaries    |
| `some()`        | Check whether any game is out of stock         |
| `every()`       | Validate that all games have valid IDs         |
| `flat()`        | Flatten nested genre lists                     |
| `flatMap()`     | Generate a flat list of games and their genres |
| `join()`        | Generate CSV-like report strings               |
| `keys()`        | Inspect inventory indexes                      |
| `values()`      | Iterate through game records                   |
| `entries()`     | Display each game's index and title            |

<Activity logs>

Track purchases, restocks, and recent events.

Show game title, price, stock, tags, and total stock value. Allow adding, editing, deleting, and sorting games.
Calculate total units in stock, total inventory value (`price × stock`), average game price, and how many games are sold out.
Let a user purchase a game, decrease its stock, calculate the receipt total, and log the transaction.
Record purchases, stock changes, and errors. Search logs, filter by event type, and display the latest events first.

Calculate the total inventory value with `reduce()`:

Find all games that need restocking with `filter()`:

Create a sorted copy with `toSorted()`:

Create a flat list of every genre with `flatMap()`:

Check whether any game needs restocking with `some()`:

Generate a CSV-like report with `map()` and `join()`:

1. Stage 1 — Inventory fundamentals: Display your existing `INITIAL_INVENTORY`, add games, remove games, edit stock, and sort the list.
2. Stage 2 — Search and filters: Search by title or ID, filter by genre, and filter by availability.
3. Stage 3 — Analytics: Calculate inventory value, average price, stock totals, and restocking alerts.
4. Stage 4 — Sales simulation: Process purchases, update stock, create receipts, and log activity.
5. Stage 5 — Reports and robustness: Export reports, validate data, paginate the inventory, and test empty arrays and missing records.

One important architectural tip: keep a master inventory array and derive filtered or sorted views from it. Use non-mutating methods where appropriate so that sorting a display doesn't unexpectedly rearrange your source data.

0 of 11

[ ]Render the initial inventory

[ ]Add and remove games

[ ]Edit game details and stock

[ ]Search by ID and title

[ ]Filter by genre and availability

[ ]Sort by title, price, and stock

[ ]Calculate inventory value with reduce()

[ ]Create a checkout and receipt

[ ]Track activity logs

[ ]Export a report

[ ]Test empty arrays and invalid inputs

gameInventory = []; - array of game objects where
a game has an id, title, price, tags = ["rpg", "adventure"], stock

{
id: 101,
title: "Zelda: Echoes",
price: 59.99,
tags: ["rpg", "adventure"],
stock: 15,
},
