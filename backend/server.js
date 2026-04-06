require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "ecommerce_cart",
  waitForConnections: true,
  connectionLimit: 10
});

app.get("/products", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM products ORDER BY id ASC");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch products." });
  }
});

app.get("/cart", async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        cart.id,
        cart.product_id,
        cart.quantity,
        products.name,
        products.price,
        products.image,
        products.description
      FROM cart
      JOIN products ON cart.product_id = products.id
      ORDER BY cart.id ASC
    `);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch cart." });
  }
});

app.post("/cart", async (req, res) => {
  try {
    const { product_id } = req.body;

    if (!product_id) {
      return res.status(400).json({ message: "product_id is required." });
    }

    const [existing] = await pool.query(
      "SELECT * FROM cart WHERE product_id = ?",
      [product_id]
    );

    if (existing.length > 0) {
      await pool.query(
        "UPDATE cart SET quantity = quantity + 1 WHERE product_id = ?",
        [product_id]
      );
    } else {
      await pool.query(
        "INSERT INTO cart (product_id, quantity) VALUES (?, 1)",
        [product_id]
      );
    }

    res.status(201).json({ message: "Item added to cart." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add item to cart." });
  }
});

app.put("/cart/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    if (quantity === undefined || quantity < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1." });
    }

    const [result] = await pool.query(
      "UPDATE cart SET quantity = ? WHERE id = ?",
      [quantity, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Cart item not found." });
    }

    res.json({ message: "Cart updated successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update cart item." });
  }
});

app.delete("/cart/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query("DELETE FROM cart WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Cart item not found." });
    }

    res.json({ message: "Item removed from cart." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete cart item." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});