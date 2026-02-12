# LiquorShed Backend

This is the backend for the LiquorShed application, built with Node.js, Express, and MongoDB.

## Features

- User Authentication (JWT)
- Admin Dashboard APIs (Products, Orders, Users)
- Product Management
- Order Management
- Seeder Script for Initial Data

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the root directory and add the following:
   ```env
   PORT=5001
   MONGO_URI=mongodb://localhost:27017/liquorshed
   JWT_SECRET=your_jwt_secret_key_here
   NODE_ENV=development
   ```

### Run the Server

- Development mode:
  ```bash
  npm run dev
  ```
- Production mode:
  ```bash
  npm start
  ```

### Seeder

- Import data:
  ```bash
  npm run data:import
  ```
- Destroy data:
  ```bash
  npm run data:destroy
  ```

## API Routes

- `/api/products` - Product routes
- `/api/users` - User routes
- `/api/orders` - Order routes
