// routes/animeRoutes.js
// GA DI PAKE
const express = require('express');
const router = express.Router();
const Anime = require('../models/Anime');

// Get all anime
router.get('/', async (req, res) => {
  try {
    const anime = await Anime.find();
    res.json(anime);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
