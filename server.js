const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const path = require("path");

const apiRoutes = require("./routes/api")
const mongoose = require("mongoose");
const { Server } = require('http');




app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

  next()
})

mongoose.connect('mongodb://127.0.0.1:27017/BankDB', {
  useNewUrlParser: true,
}).catch((err) => console.log(err)).catch((err) => console.log(err))


app.use('/', apiRoutes);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});