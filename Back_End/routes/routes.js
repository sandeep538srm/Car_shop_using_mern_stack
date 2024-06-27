const express = require("express");
const router = express.Router();
const productApi = require("../apis/api");
router.get("/fetchproduct", productApi.products_all);
//insert a record
router.post("/insertproduct", productApi.insert_product);
//update a record
router.put("/updateproduct", productApi.update_product);
//delete a record
router.delete("/deleteproduct", productApi.delete_product);

//users
router.get("/fetchuser", productApi.user_all);
//insert a record
router.post("/insertuser", productApi.insert_user);
//update a record
router.put("/updateuser", productApi.update_user);
//delete a record
router.delete("/deleteuser", productApi.delete_user);

router.post("/auth", productApi.auth);

router.get("/fetchcart", productApi.fetch_cart);
//insert a record
router.post("/insertcart", productApi.insert_cart);
//update a record
router.put("/updatecart", productApi.update_cart);
//delete a record
router.delete("/deletecart", productApi.delete_cart);
module.exports = router;
