# game

- id
- name
- price
- genre
- stock

# user

- id
- role
- name
- address
- age

# order

- id
- date
- buyerId
- paymentMethod
- totalCost
- lineItems = [
  {
  gameId,
  qty,
  subTotal
  }
  ]
