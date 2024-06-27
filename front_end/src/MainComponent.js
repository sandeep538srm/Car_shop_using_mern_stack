import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import url from "./apicalls/url";
import { Spinner, Modal, Button } from "react-bootstrap";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    const storedUsername = sessionStorage.getItem("username");
    if (storedUsername) {
      fetchProducts();
      fetchCart(storedUsername);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${url}/fetchuser`);
      const users = await response.json();

      const user = users.find(
        (user) => user.u_name === username && user.u_pwd === password
      );

      if (user) {
        sessionStorage.setItem("username", username);
        setIsLoggedIn(true);
        fetchProducts();
        fetchCart(username);
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${url}/fetchproduct`);
      const products = await response.json();
      setProducts(products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    setLoading(false);
  };

  // const fetchCart = async (username) => {
  //   try {
  //     const response = await fetch(`${url}/fetchcart?${username}`);
  //     const cartItems = await response.json();
  //     setCart(cartItems);
  //   } catch (error) {
  //     console.error("Error fetching cart:", error);
  //   }
  // };
  const fetchCart = async (username) => {
    try {
      const response = await fetch(
        `${url}/fetchcart?username=${encodeURIComponent(username)}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const cartItems = await response.json();
      setCart(cartItems);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("username");
    setIsLoggedIn(false);
    setCart([]);
  };

  const handleAddToCart = async (product) => {
    const cartItem = cart.find(
      (item) => item.p_id === product.p_id && item.u_name === username
    );

    if (cartItem) {
      const updatedItem = { ...cartItem, quantity: cartItem.quantity + 1 };
      await updateCartItem(updatedItem);
    } else {
      const newItem = {
        p_id: product.p_id,
        u_name: username,
        p_cost: product.p_cost,
        quantity: 1,
        p_img: product.p_img,
      };
      await insertCartItem(newItem);
    }

    fetchCart(username);
  };

  const insertCartItem = async (item) => {
    try {
      await fetch(`${url}/insertcart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });
      alert("insert to cart success");
    } catch (error) {
      console.error("Error inserting cart item:", error);
    }
  };

  const updateCartItem = async (item) => {
    try {
      await fetch(`${url}/updatecart`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });
    } catch (error) {
      console.error("Error updating cart item:", error);
    }
  };

  // const handleRemoveFromCart = async (item) => {
  //   try {
  //     await fetch(`${url}/deletecart/${item._id}`, {
  //       method: "DELETE",
  //     });
  //     fetchCart(username);
  //   } catch (error) {
  //     console.error("Error deleting cart item:", error);
  //   }
  // };
  const handleRemoveFromCart = async (item) => {
    try {
      const response = await fetch(`${url}/deletecart`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ p_id: item.p_id, u_name: item.u_name }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Cart item deleted successfully");
        fetchCart(username); // Refresh cart after deletion
      } else {
        console.error("Error deleting cart item:", data);
        // Handle error state if needed
      }
    } catch (error) {
      console.error("Error deleting cart item:", error);
      // Handle error state if needed
    }
  };

  const handleShowCart = () => setShowCart(true);
  const handleCloseCart = () => setShowCart(false);

  const calculateTotalCost = () => {
    return cart.reduce((total, item) => total + item.p_cost * item.quantity, 0);
  };

  return (
    <div className="container">
      {!isLoggedIn ? (
        <form onSubmit={handleLogin} className="mt-5">
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      ) : (
        <div className="mt-5">
          <h1>Welcome, {sessionStorage.getItem("username")}!</h1>
          <button onClick={handleLogout} className="btn btn-danger mb-3">
            Logout
          </button>
          <button onClick={handleShowCart} className="btn btn-info mb-3">
            View Cart
          </button>
          <h2>Products</h2>
          {loading ? (
            <div className="d-flex justify-content-center">
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <div className="row">
              {products.map((product) => (
                <div key={product._id} className="col-md-4">
                  <div className="card mb-4">
                    <img
                      src={product.p_img}
                      className="card-img-top"
                      alt={product.p_name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{product.p_name}</h5>
                      <p className="card-text">Price: ${product.p_cost}</p>
                      <p className="card-text">{product.p_desc}</p>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleAddToCart(product)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <Modal show={showCart} onHide={handleCloseCart}>
            <Modal.Header closeButton>
              <Modal.Title>Your Cart</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ul className="list-group">
                {cart.map((item, index) => (
                  <li
                    key={index}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <img
                      src={item.p_img}
                      alt={item.p_name}
                      style={{ width: "50px", height: "auto" }}
                    />
                    {item.p_name} - ${item.p_cost} x {item.quantity}
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleRemoveFromCart(item)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
              <h5 className="mt-3">Total Cost: ${calculateTotalCost()}</h5>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseCart}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default App;
