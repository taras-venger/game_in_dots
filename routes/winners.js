const express = require('express');
const router = express.Router();
const Winner = require('../models/Winner');

// Get records of 10 latest results
const getWinners = async response => {
  try {
    const winnersList = await Winner.find()
      .sort({ _id: -1 })
      .limit(10);
    response.json(winnersList);
  } catch (err) {
    response.json({ message: err.mesage });
  }
};

router.get('/', async (req, res) => getWinners(res));

router.post('/', async (req, res) => {
  const winner = new Winner({
    name: req.body.name,
    date: req.body.date
  });
  await winner.save();
  getWinners(res);
});

module.exports = router;
