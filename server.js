const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

const winnersRoute = require('./routes/winners');
const settingsRoute = require('./routes/settings');

app.use(express.json());
app.use('/game-settings', settingsRoute);
app.use('/winners', winnersRoute);

mongoose.connect(
  process.env.DB_CONNECTION,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => console.log('connected to DB')
);

app.listen(5000);
