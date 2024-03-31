const express = require('express');
const mongoose = require('mongoose');
const Anime = require("./models/Anime.js");
const cors = require('cors');

const app = express();
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://admin_1:qwerty_Admin1_qwerty@AnimeDB.lihdhug.mongodb.net/AnimeList?retryWrites=true&w=majority&appName=AnimeDB"
  )
  .then(() => {
    console.log("MongoDB connected");
    app.listen(4000, () => {
      console.log("server is running on port 4000");
    });
  })
  .catch((err) => {
    console.log("MongoDB Failed");
  });
  
app.get('/api/anime',async (req,res) => {
  try{
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const animeList = await Anime.find().skip(startIndex).limit(limit);
    const totalItems = await Anime.countDocuments();
    const response = {
      totalItems: totalItems,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: page,
      animeList: animeList
    };
    // const anime = await Anime.find({}).limit(30);
    res.status(200).json(response);    
  } catch(err){
    console.error('Error fetching anime data:', err);
    res.status(500).json(err);
  }
});

app.get('/api/anime/:anime_id', async (req, res) => {
  try {
    const { anime_id } = req.params;
    const anime = await Anime.findOne({anime_id: anime_id});
    if (!anime) {
      return res.status(404).json({ error: 'Anime not found' });
    }
    res.status(200).json(anime);
  } catch (err) {
    console.error('Error fetching anime data:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


