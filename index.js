const express = require('express');
const passport = require('passport');
const OAuth2Strategy = require('passport-oauth2').Strategy;

const app = express();

// JSON data
const audio = {
  scales: [
    {
      "name": "C Major",
      "file_path": "./assets/audio/c_scale.mp3",
      "duration": "0:04"
    },
    {
      "name": "C#/D Flat Major",
      "file_path": "./assets/audio/csharp_scale.mp3",
      "duration": "0:04"
    },
    {
      "name": "D Major",
      "file_path": "./assets/audio/d_scale.mp3",
      "duration": "0:04"
    },
    {
      "name": " D#/E Flat Major",
      "file_path": "./assets/audio/dsharp_scale.mp3",
      "duration": "0:04"
    },
    {
      "name": "E Major",
      "file_path": "./assets/audio/e_scale.mp3",
      "duration": "0:04"
    },
    {
      "name": "F Major",
      "file_path": "./assets/audio/F_scale.mp3",
      "duration": "0:04"
    },
    {
      "name": "F#/G Flat Major",
      "file_path": "./assets/audio/fsharp_scale.mp3",
      "duration": "0:04"
    },
    {
      "name": "G Major",
      "file_path": "./assets/audio/g_scale.mp3",
      "duration": "0:04"
    },
    {
      "name": "G#/A Flat Major",
      "file_path": "./assets/audio/gsharp_scale.mp3",
      "duration": "0:04"
    },
    {
      "name": "A Major",
      "file_path": "./assets/audio/a_scale.mp3",
      "duration": "0:04"
    },
    {
      "name": "A#/B Flat Major",
      "file_path": "./assets/audio/asharp_scale.mp3",
      "duration": "0:04"
    },
    {
      "name": "B/C Flat Major",
      "file_path": "./assets/audio/b_scale.mp3",
      "duration": "0:04"
    }
  ]
};

passport.use(
  new OAuth2Strategy(
    {
      authorizationURL: 'AUTHORIZATION_URL',
      tokenURL: 'TOKEN_URL',
      clientID: 'CLIENT_ID',
      clientSecret: 'CLIENT_SECRET',
      callbackURL: 'CALLBACK_URL',
    },
    (accessToken, refreshToken, profile, cb) => {
      // The callback function after successful authentication
      // You can customize this function based on your requirements
      // For example, you can save the user information in a database
      // or perform additional checks/operations
      return cb(null, profile);
    }
  )
);

app.use(passport.initialize());
app.use(passport.session());

app.get(
  '/scales',
  passport.authenticate('oauth2', { session: false }),
  (req, res) => {
    res.json(audio.scales);
  }
);

app.post(
  '/scales',
  passport.authenticate('oauth2', { session: false }),
  (req, res) => {
    // Assuming the new scale data is passed in the request body
    const newScale = req.body;
    audio.scales.push(newScale);
    res.sendStatus(201); // Send a 201 Created status
  }
);

// Start the server
app.listen(8080, () => {
  console.log('API up on port 8080');
});
