import { useEffect, useMemo, useState } from "react";

const API_BASE = "http://localhost:5000";

export default function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingCart, setLoadingCart] = useState(true);
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const fetchProducts = async () => {
    try {
      setLoadingProducts(true);
      const res = await fetch(`${API_BASE}/products`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to load cakes.");
      }

      setProducts(data);
    } catch (error) {
      console.error(error);
      setMessage("Failed to load cakes.");
    } finally {
      setLoadingProducts(false);
    }
  };

  const fetchCart = async () => {
    try {
      setLoadingCart(true);
      const res = await fetch(`${API_BASE}/cart`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to load cart.");
      }

      setCart(data);
    } catch (error) {
      console.error(error);
      setMessage("Failed to load cart.");
    } finally {
      setLoadingCart(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => setMessage(""), 2500);
    return () => clearTimeout(timer);
  }, [message]);

  const addToCart = async (productId) => {
    try {
      const res = await fetch(`${API_BASE}/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ product_id: productId })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to add cake.");
      }

      setMessage("Cake added to cart ♡");
      fetchCart();
    } catch (error) {
      console.error(error);
      setMessage("Failed to add cake.");
    }
  };

  const updateQuantity = async (cartId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      const res = await fetch(`${API_BASE}/cart/${cartId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ quantity: newQuantity })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update quantity.");
      }

      fetchCart();
    } catch (error) {
      console.error(error);
      setMessage("Failed to update quantity.");
    }
  };

  const removeItem = async (cartId) => {
    try {
      const res = await fetch(`${API_BASE}/cart/${cartId}`, {
        method: "DELETE"
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to remove cake.");
      }

      setMessage("Removed from cart");
      fetchCart();
    } catch (error) {
      console.error(error);
      setMessage("Failed to remove.");
    }
  };

  const totalPrice = useMemo(() => {
    return cart
      .reduce((sum, item) => sum + Number(item.price) * item.quantity, 0)
      .toFixed(2);
  }, [cart]);

  const categories = useMemo(() => {
    const found = new Set();

    products.forEach((product) => {
      const text = `${product.name} ${product.description}`.toLowerCase();

      if (text.includes("chocolate")) found.add("Chocolate");
      if (text.includes("strawberry")) found.add("Strawberry");
      if (text.includes("fruit")) found.add("Fruit");
      if (text.includes("vanilla")) found.add("Vanilla");
      if (text.includes("cupcake")) found.add("Cupcake");
      if (text.includes("cheese")) found.add("Cheesecake");
    });

    return ["All", ...found];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const text = `${product.name} ${product.description}`.toLowerCase();

      const matchesSearch = text.includes(searchTerm.toLowerCase());

      const matchesCategory =
        activeCategory === "All" || text.includes(activeCategory.toLowerCase());

      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, activeCategory]);

  return (
    <div className="page">
      <header className="header hero">
        <div className="hero-text">
          <p className="hero-tag">Baked fresh with love ✿</p>
          <h1>Sweet Blossom Cakes</h1>
          <p className="hero-subtitle">
            Soft, dreamy cakes made to brighten your sweetest moments.
          </p>

          <div className="hero-buttons">
            <button
              className="hero-primary-btn"
              onClick={() =>
                document
                  .getElementById("cakes")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Order Now
            </button>

            <button
              className="hero-secondary-btn"
              onClick={() =>
                document
                  .getElementById("cakes")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              See Our Cakes
            </button>
          </div>
        </div>

        <div className="hero-image-wrap">
          <img
            className="hero-image"
            src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=80"
            alt="Cute pink cake"
          />
          <div className="hero-badge badge-one">Fresh Daily</div>
          <div className="hero-badge badge-two">Cute & Sweet ♡</div>
        </div>
      </header>

      <div
        className="floating-cart"
        onClick={() =>
          document
            .querySelector(".cart-section")
            ?.scrollIntoView({ behavior: "smooth" })
        }
      >
        🛒
        {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
      </div>

      {message && <div className="toast">{message}</div>}

      <main className="layout">
        <section className="products-section" id="cakes">
          <h2>Our Cakes ✿</h2>

          <div className="shop-toolbar">
            <input
              type="text"
              className="search-input"
              placeholder="Search cakes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="category-list">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`category-btn ${
                    activeCategory === category ? "active-category" : ""
                  }`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            <p className="result-count">
              Showing {filteredProducts.length} cake
              {filteredProducts.length !== 1 ? "s" : ""}
            </p>
          </div>

          {loadingProducts ? (
            <p>Loading cakes...</p>
          ) : filteredProducts.length === 0 ? (
            <div className="empty-cart">No matching cakes found...</div>
          ) : (
            <div className="product-grid">
              {filteredProducts.map((product) => (
                <div className="product-card" key={product.id}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                  />

                  <div className="product-body">
                    <h3>{product.name}</h3>
                    <p className="description">{product.description}</p>
                    <p className="price">${Number(product.price).toFixed(2)}</p>
                    <button onClick={() => addToCart(product.id)}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <aside className="cart-section">
          <h2>Your Sweet Cart ♡ ({cart.length})</h2>

          {loadingCart ? (
            <p>Loading...</p>
          ) : cart.length === 0 ? (
            <div className="empty-cart">
              Your cart is waiting for something sweet...
            </div>
          ) : (
            <>
              <div className="cart-list">
                {cart.map((item) => (
                  <div className="cart-item" key={item.id}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="cart-image"
                    />

                    <div className="cart-info">
                      <h3>{item.name}</h3>
                      <p>${Number(item.price).toFixed(2)} each</p>

                      <div className="quantity-controls">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="cart-actions">
                      <p className="item-total">
                        ${(Number(item.price) * item.quantity).toFixed(2)}
                      </p>
                      <button
                        className="remove-btn"
                        onClick={() => removeItem(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-summary">
                <h3>Total: ${totalPrice}</h3>
              </div>
            </>
          )}
        </aside>
      </main>
    </div>
  );
}