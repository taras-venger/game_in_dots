const express = require('express');
const router = express.Router();
const Winner = require('../models/Winner');

// Get the list
router.get('/', async (req, res) => {
  try {
    const winnersList = await Winner.find();
    res.json(winnersList);
  } catch (err) {
    res.status(500).json({ message: err.mesage });
  }
});

// Report new winner
router.post('/', async (req, res) => {
  const winner = new Winner({
    name: req.body.name
  });
  try {
    const newWinner = await winner.save();
    res.json(newWinner);
  } catch (err) {
    res.json({ message: err.mesage });
  }
});

module.exports = router;
