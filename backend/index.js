const express = require('express');
const mongoose = require('mongoose');
var app = express();
const port = 3001;
const cors = require('cors');

app.use(cors());


var adminRouter = require('../backend/routes/api');
app.use(require("./routes/api"))

mongoose.connect('mongodb://127.0.0.1:27017/MATRIX', 

console.log("Db Connected"));


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
