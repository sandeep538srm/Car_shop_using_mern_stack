const Product = require("../model/product_s");
const User = require("../model/user_s");
const Cart = require("../model/cart_s");

const products_all = async (req, res) => {
  try {
    const products = await Product.find();
    console.log("Products data sent");
    res.json(products);
  } catch (err) {
    console.log("Fetch error:", err);
    res.status(500).json({ message: err.message });
  }
};

const insert_product = async (req, res) => {
  const product = new Product({
    p_id: req.body.p_id,
    p_name: req.body.p_name,
    p_cost: req.body.p_cost,
    p_cat: req.body.p_cat,
    p_desc: req.body.p_desc,
    p_img: req.body.p_img,
  });
  try {
    const savedProduct = await product.save();
    console.log("Product inserted:", savedProduct);
    res.json(savedProduct);
  } catch (error) {
    console.error("Error inserting product:", error);
    res.status(400).json({ message: error.message });
  }
};

const update_product = async (req, res) => {
  const p_id = req.body.p_id;
  const product = {
    p_id: req.body.p_id,
    p_name: req.body.p_name,
    p_cost: req.body.p_cost,
    p_cat: req.body.p_cat,
    p_desc: req.body.p_desc,
    p_img: req.body.p_img,
  };
  try {
    const updateProduct = await Product.updateOne({ p_id }, product);
    if (updateProduct.modifiedCount !== 0) {
      console.log("Product updated:", updateProduct);
      res.json({ update: "success" });
    } else {
      console.log("Product not found for update");
      res.json({ update: "Record Not Found" });
    }
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(400).json({ message: error.message });
  }
};

const delete_product = async (req, res) => {
  const p_id = req.body.p_id;
  try {
    const deletedProduct = await Product.deleteOne({ p_id });
    if (deletedProduct.deletedCount !== 0) {
      console.log("Product deleted");
      res.json({ delete: "success" });
    } else {
      console.log("Product not found for deletion");
      res.json({ delete: "Record Not Found" });
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(400).json({ message: error.message });
  }
};

const user_all = async (req, res) => {
  try {
    const users = await User.find();
    console.log("Users data sent");
    res.json(users);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ message: err.message });
  }
};

const insert_user = async (req, res) => {
  const user = new User({
    u_id: req.body.u_id,
    u_name: req.body.u_name,
    u_pwd: req.body.u_pwd,
    u_u_email: req.body.u_u_email,
    u_addr: req.body.u_addr,
    u_contact: req.body.u_contact,
  });
  try {
    const savedUser = await user.save();
    console.log("User inserted:", savedUser);
    res.json(savedUser);
  } catch (error) {
    console.error("Error inserting user:", error);
    res.status(400).json({ message: error.message });
  }
};

const update_user = async (req, res) => {
  const u_id = req.body.u_id;
  const user = {
    u_id: req.body.u_id,
    u_name: req.body.u_name,
    u_pwd: req.body.u_pwd,
    u_u_email: req.body.u_u_email,
    u_addr: req.body.u_addr,
    u_contact: req.body.u_contact,
  };
  try {
    const updateUser = await User.updateOne({ u_id }, user);
    if (updateUser.modifiedCount !== 0) {
      console.log("User updated:", updateUser);
      res.json({ update: "success" });
    } else {
      console.log("User not found for update");
      res.json({ update: "Record Not Found" });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(400).json({ message: error.message });
  }
};

const delete_user = async (req, res) => {
  const u_id = req.body.u_id;
  try {
    const deletedUser = await User.deleteOne({ u_id });
    if (deletedUser.deletedCount !== 0) {
      console.log("User deleted");
      res.json({ delete: "success" });
    } else {
      console.log("User not found for deletion");
      res.json({ delete: "Record Not Found" });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(400).json({ message: error.message });
  }
};

const auth = async (req, res) => {
  const { u_name, u_pwd } = req.body;
  try {
    const user = await User.findOne({ u_name, u_pwd });
    if (user) {
      console.log("Authentication successful");
      res.json({ user: "success" });
    } else {
      console.log("Authentication failed");
      res.json({ user: "fail" });
    }
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(400).json({ user: "fail", message: error.message });
  }
};

const cart_all = async (req, res) => {
  try {
    const carts = await Cart.find();
    console.log("Carts data sent");
    res.json(carts);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ message: err.message });
  }
};
// const cart_all = async (req, res) => {
//     u_name = req.body.u_name;
//     try {
//       const cartItems = await Cart.find({ u_name: u_name });
//       console.log("Cart items are: ", cartItems);
//       res.json(cartItems);
//     } catch (error) {
//       console.log("Cart Fetch error :- ", error);
//       res.json({ message: error });
//     }
// }
// const fetch_cart = async (req, res) => {
//   const u_name = req.body.u_name; // Declare u_name with const
//   try {
//     const cartItems = await Cart.find({ u_name: u_name });
//     console.log("Cart items are:", cartItems);
//     res.status(200).json(cartItems); // Send status code 200 for successful response
//   } catch (error) {
//     console.log("Cart Fetch error:", error);
//     res.status(500).json({ message: error.message }); // Send status code 500 for server error
//   }
// };
const fetch_cart = async (req, res) => {
  const u_name = req.query.username || req.body.u_name; // Support both query parameter and body
  try {
    const cartItems = await Cart.find({ u_name: u_name });
    console.log("Cart items are:", cartItems);
    res.status(200).json(cartItems); // Send status code 200 for successful response
  } catch (error) {
    console.log("Cart Fetch error:", error);
    res.status(500).json({ message: error.message }); // Send status code 500 for server error
  }
};

const insert_cart = async (req, res) => {
  const cart = new Cart({
    p_id: req.body.p_id,
    u_name: req.body.u_name,
    p_cost: req.body.p_cost,
    p_img: req.body.p_img,
    quantity: req.body.quantity,
  });
  try {
    const savedCart = await cart.save();
    console.log("Cart inserted:", savedCart);
    res.json(savedCart);
  } catch (error) {
    console.error("Error inserting cart:", error);
    res.status(400).json({ message: error.message });
  }
};

const update_cart = async (req, res) => {
  const { p_id, u_name, p_cost, p_img, quantity } = req.body;
  const cart = { p_id, u_name, p_cost, p_img, quantity };
  try {
    const updateCart = await Cart.updateOne({ p_id, u_name }, cart);
    if (updateCart.modifiedCount !== 0) {
      console.log("Cart updated:", updateCart);
      res.json({ update: "success" });
    } else {
      console.log("Cart not found for update");
      res.json({ update: "Record Not Found" });
    }
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(400).json({ message: error.message });
  }
};

const delete_cart = async (req, res) => {
  const { p_id, u_name } = req.body;
  try {
    const deletedCart = await Cart.deleteOne({ p_id, u_name });
    if (deletedCart.deletedCount !== 0) {
      console.log("Cart deleted");
      res.json({ delete: "success" });
    } else {
      console.log("Cart not found for deletion");
      res.json({ delete: "Record Not Found" });
    }
  } catch (error) {
    console.error("Error deleting cart:", error);
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  products_all,
  insert_product,
  update_product,
  delete_product,
  user_all,
  insert_user,
  update_user,
  delete_user,
  auth,
  //cart_all,
  insert_cart,
  update_cart,
  delete_cart,
  fetch_cart,
};
