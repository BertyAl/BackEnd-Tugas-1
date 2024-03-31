const mongoose = require("mongoose");
const AnimeSchema = mongoose.Schema({
  anime_id: Number,
  title: String,
  synopsis: String,
  main_pic: String,
  genres: String,
  studios: String,
  season: String,
  num_episodes: Number
});
    
const Anime = mongoose.model("AnimeList", AnimeSchema,"AnimeList");
module.exports = Anime;