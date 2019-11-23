const express = require('express');
const router = express.Router();
const Settings = require('../models/Settings');

router.get('/', async (req, res) => {
  try {
    const settingOptions = await Settings.find();
    res.json(settingOptions);
  } catch (err) {
    res.status(500).json({ message: err.mesage });
  }
});

module.exports = router;
