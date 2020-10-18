const mongoose = require('mongoose');
require('dotenv').config();

const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  classId: Number,
  className: String,
  role: String,
  createdAt: { type: Date, default: Date.now },
});

const classSchema = new mongoose.Schema({
  classId: Number,
  className: String,
  classConcept: String,
  classScore: Number,
  rank: Number,
  createdAt: { type: Date, default: Date.now },
});

const courseSchema = new mongoose.Schema({
  name: String,
  type: String,
  score: Number,
  intro: String,
  date: Date,
  category: String,
  req: String,
  createdAt: { type: Date, default: Date.now },
});

mongoose.model('User', userSchema);
mongoose.model('Class', classSchema);
mongoose.model('Course', courseSchema);

mongoose.connect(
  process.env.MongoURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('database connected');
      // const Class = mongoose.model('Class');
      // let temp = new Class();
      // temp.classId = 0;
      // temp.className = '管理员班';
      // temp.classConcept = '';
      // temp.classScore = 0;
      // temp.rank = 0;
      // temp.save((err) => {
      //   if (err) console.log(err);
      //   else console.log('yeah');
      // });
    }
  },
);
