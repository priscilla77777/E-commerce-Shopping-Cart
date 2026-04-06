# 🌸 Sweet Blossom Cakes
## Overview

Sweet Blossom Cakes is a single-page e-commerce web application designed to provide users with a simple and interactive way to browse and purchase cakes online.
The website solves the problem of static or non-interactive shopping pages by offering a dynamic cart system where users can instantly manage items without page reloads, improving user experience and usability.

# ✨ Features
Responsive single-page design
View products dynamically from database
Add items to shopping cart
Update item quantity in real-time
Remove items from cart
Live total price calculation
Smooth user interaction without page reload

# 🛠️ Technical Stack

## Frontend

React (SPA rendering)
Vite (development & build tool)
JavaScript (ES6)
CSS (custom styling)

## Backend

Node.js
Express.js (API routing)

## Database

MySQL (data storage)

## Routing

RESTful API endpoints via Express

## Deployment

Localhost development (can be extended to cloud deployment)

# 📁 Project Structure
Ecommerce-cart/
├── backend/
│   ├── package.json
│   └── server.js        # Express server & API
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   └── src/
│       ├── main.jsx     # Entry point
│       ├── App.jsx      # Main UI logic
│       └── styles.css   # Styling
├── database.sql         # Database schema
└── README.md

# 🚀 How to Run
## Import Database
Run the following in MySQL Workbench or terminal:
SOURCE database.sql;
## Backend Setup
1. Go to the backend folder:
   cd backend
2. Install dependencies:
   npm install
3. Create a `.env` file based on `.env.example`
4. Update the database settings in `.env`:
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=ecommerce_cart
   PORT=5000
5. Start the backend server:
   node server.js

## Start Frontend
cd frontend
npm install
npm run dev
## Open Application
http://localhost:5173


## ⚠️ Notes
Update MySQL credentials in backend/.env
Backend runs on http://localhost:5000
Frontend connects to backend API at port 5000

## 🔄 CRUD Mapping
Create → Add item to cart
Read → Display products and cart
Update → Change quantity
Delete → Remove item

## 💡 Challenges and Solutions
One of the main challenges was managing real-time cart updates between the frontend and backend. This was solved by implementing asynchronous API calls using JavaScript and ensuring proper state management in React.

Another difficulty was connecting React with the MySQL database through Express APIs, which required careful handling of routes and data flow.

Additionally, handling user interactions without page reloads required understanding of React’s component lifecycle and state updates.

Debugging API errors and database connections was also challenging, especially ensuring correct SQL queries and server responses.

These challenges improved understanding of full-stack development and integration between frontend and backend systems.
