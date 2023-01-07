# Items stock

A DDD items application focused on separation of concerns and scalability.

## API

### Create an item

POST http://localhost:3000/item

```json
{
  "sku": "AS-1234",
  "displayName": "Batedeira",
  "price": 500
}
```

### List items

GET http://localhost:3000/item
