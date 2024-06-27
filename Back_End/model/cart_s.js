const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema({
  p_id: Number,
  u_name: String,
  p_img: String,
  p_cost: String,
  quantity: Number,
});
module.exports = mongoose.model("Cart", cartSchema);
