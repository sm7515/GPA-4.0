const mongoose = require('mongoose');
require('dotenv').config();

const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  classId: Number,
  className: String,
  score: Number,
  classScore: Number,
  role: String,
  createdAt: { type: Date, default: Date.now },
});

mongoose.model('User', userSchema);

mongoose.connect(
  process.env.MongoURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('database connected');
    }
  },
);
