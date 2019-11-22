const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');

mongoose.connect(
  process.env.DB_CONNECTION,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => console.log('connected to DB')
);

app.listen(5000);
