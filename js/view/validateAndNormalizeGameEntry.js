/*
 * Ensures the form input values are valid game data.
 * I am using a lot of throw statements here because
 * I am validating every variable from the input fields
 * throw stops the current function execution and allows
 * me to catch the error in a try catch block
 */

/* 
TODO HTML
<!-- Price -->
<input type="number" min="0" step="0.01">

<!-- Stock -->
<input type="number" min="0" step="1">
*/
export default function validateAndNormalizeGameEntry(
  titleInput,
  priceInput,
  stockInput,
  tagsInput,
) {
  // Creates new variables with no left, right and more than 1 middle spaces.
  const rawTitle = titleInput.trim().replace(/\s+/g, " ");

  // Just removes left and right spaces.
  // This fails if you test and put numbers instead of strings
  // This expects entries from an input tag which returns strings
  const rawPrice = priceInput.trim();
  const rawStock = stockInput.trim();

  // Check if empty.
  if (rawTitle === "") {
    throw new TypeError(`Game must have a Title! Received: ${rawTitle}`);
  }

  if (rawPrice === "") {
    throw new TypeError(`Game must have a price! Received: ${rawPrice}`);
  }

  if (rawStock === "") {
    throw new TypeError(`Game must have a stock count! Received: ${rawStock}`);
  }

  // Simple character check to avoid script injections.
  if (!isValidTitle(rawTitle)) {
    throw new TypeError(
      `Game title contains invalid characters! Received: ${rawTitle}`,
    );
  }

  // Sets minimum title.
  if (rawTitle.length < 2) {
    throw new TypeError(
      `Game title should be at least 2 characters! Received: ${rawTitle.length}`,
    );
  }

  // Sets maximum title.
  if (rawTitle.length > 32) {
    throw new TypeError(
      `Game title should not exceed 32 characters! Received: ${rawTitle.length}`,
    );
  }

  // Price only accepts decimals with up to 2 places.
  if (!isValidPrice(rawPrice)) {
    throw new TypeError(
      `Price must have up to 2 decimal places! Received: ${rawPrice}`,
    );
  }

  // Stock only accepts plain number.
  if (!isValidStock(rawStock)) {
    throw new TypeError(`Stock must be a valid number! Received: ${rawStock}`);
  }

  // Final accepted values
  const title = rawTitle;
  // title and rawTitle feels useless here but I'll keep it like this for now.

  // Converting to number because these are trimmed strings
  const price = Number(rawPrice);
  const stock = Number(rawStock);
  const tags = cleanTags(tagsInput);

  return {
    title,
    price,
    stock,
    tags,
  };
}

/*
 * Helper functions
 */
// For title
function isValidTitle(rawTitle) {
  const allowedTitleRegEx = /^[\p{L}\p{N} \p{M}'’"!.,:()&+\-]+$/u;

  return allowedTitleRegEx.test(rawTitle);
}

// For price
function isValidPrice(priceValue) {
  const allowedPriceRegEx = /^(?:0|[1-9]\d*)(?:\.\d{1,2})?$/;

  return allowedPriceRegEx.test(priceValue);
}

// For stock
function isValidStock(stockValue) {
  const allowedStockRegEx = /^(?:0|[1-9]\d*)$/;

  return allowedStockRegEx.test(stockValue);
}

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
