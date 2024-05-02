const express = require("express");
const path = require("path");
var flash = require("express-flash");
var cookieParser = require("cookie-parser");
const session = require("express-session");
const router = require("./Routes/UseRouter");
const authRouter = require("./Routes/authRouter");
const User = require("./model/UserModel");
const newUser = require("./model/ProductModel");
const validateRequest = require("./middleware/validate");
const errorMessage = require("./middleware/validate");
const {connect}= require('./dbconfig/db')

//env config
require("dotenv").config();

//obj init
const app = express();

//port
PORT = process.env.PORT || 3000;

app.set("views", path.join(__dirname + "/views"));
app.set("view engine", "ejs");

//middlewares
app.use(cookieParser("keyboard cat"));
app.use(
  require("express-session")({
    secret: "The milk would do that",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/v2", authRouter);
app.use("/api/v1", router);

//routes
app.get("/", (req, res) => {
  res.cookie("userData", "kathan", { expire: 24 * 60 * 60 * 1000 });

  return res.render("register", { message: "" });
});

connect().then(()=>{
  app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
  });
})
