const express = require('express');
const mongoose = require('mongoose');
const Anime = require("./models/Anime.js");
const User = require("./models/User.js");
const cors = require('cors');
const bcrypt = require('bcrypt');
var jwt = require("jsonwebtoken");
const methodOverride = require('method-override');
const config = require("./config/auth.config");
const session = require('express-session');
const app = express();
app.use(session({
  secret: config.secret, // Replace 'your-secret-key' with a secret string for session encryption
  resave: false,
  saveUninitialized: true
}));

app.use (methodOverride('_method'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
          // Check if username exists
          const usernameExists = await User.exists({ username: req.body.username });
          if (usernameExists) {
            return res.status(400).send({ message: "Failed! Username is already in use!" });
          }
      
          // Check if email exists
          const emailExists = await User.exists({ email: req.body.email });
          if (emailExists) {
            return res.status(400).send({ message: "Failed! Email is already in use!" });
          }
      
          // If neither username nor email exists, move to the next middleware
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
    
        // Save the user to the database
        await user.save()
    
        // Send success response
        res.send({ message: "User was registered successfully!" });
      } catch (error) {
        // Handle errors
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
          expiresIn: 30, // 24 hours 86400
        });
    
        // Set the token in the session
        req.session.token = token;
    
        // Return user data and token as JSON response
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

    // app.post("/api/auth/signout", (req, res) => {
    //   try {
    //     // Destroy the session
    //     req.session.destroy((err) => {
    //       if (err) {
    //         console.error('Session destroy failed:', err);
    //         return res.status(500).json({ message: 'Sign-out failed' });
    //       } else {
    //         return res.status(200).json({ message: "You've been signed out!" });
    //       }
    //     });
    //   } catch (err) {
    //     console.error('Sign-out failed:', err);
    //     return res.status(500).json({ message: 'Sign-out failed' });
    //   }
    // });
    

    // app.post("/api/auth/signout", 
    // exports.signout = async (req, res) => {
    //   try {
    //     console.log("Session before sign-out:", req.session); // Log session before sign-out
    //     req.session = null; // Clear session data
    //     console.log("Session after sign-out:", req.session);
    //     return res.status(200).send({ message: "You've been signed out!" });
    //   } catch (err) {
    //     this.next(err);
    //   }
    // });

// memangil fungsi dari anime untuk di jadikan list pada  data list 

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


