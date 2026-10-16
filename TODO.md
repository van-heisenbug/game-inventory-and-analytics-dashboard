# inventory

- gameId
- orderId

# game

- id
- name
- stock
- price
- genre

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
