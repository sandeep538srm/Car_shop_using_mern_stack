let express = require("express");
let bodyparser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
//import url
let url = require("./url");
let app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: "false" }));
app.use(cors());
mongoose.connect(url, { dbName: "miniprj" }).then(
  () => {
    console.log("connection established");
  },
  (err) => {
    console.log("connection error", err);
  }
);
const productRoutes = require("./routes/routes");
app.use("/", productRoutes);
let port = 8080;
app.listen(port, () => {
  console.log("listening on port:", port);
});
