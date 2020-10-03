const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');

import './db';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('public'));
app.use(cors());
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

app.get('/app/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.post('/api/login', (req, res) => {
  const User = mongoose.model('User');

  const { username } = req.body;
  User.findOne({ username }, (err, user) => {
    if (err) {
      res.status(500).send('database lookup error');
    } else if (!user) {
      console.log("user doesn't exist");
      res.status(401).send("User doesn't exist");
    } else {
      let options = {
        maxAge: 1000 * 60 * 15, // would expire after 15 minutes
      };
      const { role } = user;
      console.log('success log in', username);
      res.cookie('username', username, options);
      res.cookie('role', role, options);
      res.send(role);
    }
  });
});

app.listen(port, () => console.log(`listening on port ${port}`));
