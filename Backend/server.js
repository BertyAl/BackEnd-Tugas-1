const express = require('express');
const mongoose = require('mongoose');
const Anime = require("./models/Anime.js");
const User = require("./models/User.js");
const Form = require("./models/Form.js");

const cors = require('cors');
const bcrypt = require('bcrypt');
var jwt = require("jsonwebtoken");
const methodOverride = require('method-override');
const config = require("./config/auth.config");
const session = require('express-session');
const app = express();
const bodyParser = require('body-parser');
app.use(session({
  secret: config.secret, 
  resave: false,
  saveUninitialized: true
}));

app.use (methodOverride('_method'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

   app.post(
    "/api/auth/signup",
    [
      checkDuplicateUsernameOrEmail = async (req, res, next) => {
        try {
          // check duplikat username
          const usernameExists = await User.exists({ username: req.body.username });
          if (usernameExists) {
            return res.status(400).send({ message: "Failed! Username is already in use!" });
          }
      
          // Check duplikat email
          const emailExists = await User.exists({ email: req.body.email });
          if (emailExists) {
            return res.status(400).send({ message: "Failed! Email is already in use!" });
          }
      
          // bila tidak ada duplikat username dan email 
          next();
        } catch (error) {
          console.error(error);
          res.status(500).send({ message: "Internal Server Error" });
        }
      },
    ],
    exports.signup = async (req, res) => {
      try {
        const user = new User({
          username: req.body.username,
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, 8),
        });
    
        // menyimpan data user ke dalem database
        await user.save()
    
        res.send({ message: "User was registered successfully!" });
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal Server Error" });
      }
    }); 

    app.post("/api/auth/signin", exports.signin = async (req, res) => {
      try {
        const user = await User.findOne({ username: req.body.username }).exec();
        if (!user) {
          return res.status(404).json({ message: "User Not found." });
        }
    
        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) {
          return res.status(401).json({ message: "Invalid Password!" });
        }
    config
        const token = jwt.sign({ id: user.id }, config.secret, {
          algorithm: 'HS256',
          allowInsecureKeySizes: true,
          expiresIn: 30, // 24 hours 86400 (jumlah session yang di gunakan)
        });
    
        req.session.token = token;
    
        // mengembalikan data user sebagai JSON
        res.status(200).json({
          id: user._id,
          username: user.username,
          email: user.email,
          token: token
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    });

app.get('/api/anime/search', async (req, res) => {
  const query = req.query.q;
  try {
    const results = await Anime.find({ $text: { $search: query } });
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// memangil fungsi dari anime untuk di jadikan list pada  data list 

app.get('/api/anime',async (req,res) => {
  try{
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
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

// memangil fungsi dari anime untuk di jadikan list pada  anime details
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

app.post(
  "/api/form/create",
  [
    checkDuplicateTitle = async (req, res, next) => {
      try {
        // check duplikat tile
        const titleExists = await Form.exists({ title: req.body.title });
        if (titleExists) {
          return res.status(400).send({ message: "Failed! Thread is already in Create!" });
        }
    
        // bila tidak ada duplikat 
        next();
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal Server Error" });
      }
     },
    ],
exports.form = async (req, res) => {
  const { title, thread } = req.body;
  try {
    const form = new Form({
      title,
      thread,
    });

    // menyimpan data form ke dalem database
    await form.save()

    res.send({ message: "Thread has been created!" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }

});