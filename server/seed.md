# Server Seed Instructions

This file documents the seed process for the backend server.

## Seed script

The `server/seed.js` script inserts initial demo data into MongoDB:

- 2 users:
  - `admin@shopnest.com` (admin role)
  - `user@shopnest.com` (standard user)
- 3 products:
  - Wireless Headphones
  - Classic Leather Wallet
  - Smart Fitness Watch
- 1 sample order for the demo user

## How to run

From the `server/` folder, run:

```bash
npm run seed
```

This script will:

1. connect to MongoDB
2. delete all documents from `User`, `Product`, and `Order`
3. insert the seed users, products, and order

## Environment variables

The database connection supports the following environment variables:

- `MONGODB_URI` — primary MongoDB connection string
- `LOCAL_MONGODB_URI` — optional local MongoDB connection string fallback

If neither is set, the seed script uses this default:

```text
mongodb://127.0.0.1:27017/shopnest
```

## Default credentials

- Admin email: `admin@shopnest.com`
- Admin password: `Admin@123`
- User email: `user@shopnest.com`
- User password: `User@123`

## Notes

- The seed script calls `connectDB()` from `server/config/db.js`.
- If MongoDB is not reachable, the process exits with an error.
- Running the seed script will remove existing data in the `User`, `Product`, and `Order` collections.
