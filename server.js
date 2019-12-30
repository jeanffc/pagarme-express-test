const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const routes = require("./routes");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3000, function() {
  console.log("http://localhost:3000/");
});
