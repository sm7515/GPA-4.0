const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');

require('./db');

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

app.use('/api/static', express.static(path.join(__dirname, '/assets')));

app.get('/app/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.get('/api/getClasses', (req, res) => {
  const Class = mongoose.model('Class');

  const { exludeAdmin } = req.query;

  let docs = [];
  Class.find({})
    .sort({ classId: 1 })
    .then((data) => {
      if (exludeAdmin)
        docs = data
          .filter((ele) => ele.classId !== 0)
          .map((ele) => ({ id: ele.classId, value: ele.className }));
      else
        docs = data.map((ele) => ({ id: ele.classId, value: ele.className }));
      res.send(docs);
    });
});

app.get('/api/getClass', (req, res) => {
  const Class = mongoose.model('Class');

  const { classId } = req.query;

  Class.findOne({ classId }, (err, doc) => {
    if (err) {
      res.status(500).send('服务器错误 \ud83d\ude2d');
    } else if (!doc) {
      res.status(401).send('数据库查找错误 \uD83D\uDE30');
    } else {
      res.send(doc);
    }
  });
});

app.post('/api/updateScore', async (req, res) => {
  const Class = mongoose.model('Class');

  const { id, score } = req.body;
  let doc = await Class.findOneAndUpdate(
    { classId: id },
    { $set: { classScore: score } },
    { new: true },
  );
  if (doc) res.send(`成功更新 ${doc.className} 班积分至 ${doc.classScore}`);
  else res.send(`更新失败 TAT`);
});

app.post('/api/updateClassName', async (req, res) => {
  const Class = mongoose.model('Class');
  const User = mongoose.model('User');

  const { name, classId } = req.body;
  let doc = await Class.findOneAndUpdate(
    { classId },
    { $set: { className: name } },
    { new: true },
  );

  let doc2 = await User.findOneAndUpdate(
    { classId },
    { $set: { className: name } },
    { new: true },
  );
  if (doc && doc2) res.send(`成功更新 ${doc.className} `);
  else res.send(`更新失败 TAT`);
});

app.post('/api/updateClassConcept', async (req, res) => {
  const Class = mongoose.model('Class');

  const { concept, classId } = req.body;
  let doc = await Class.findOneAndUpdate(
    { classId },
    { $set: { classConcept: concept } },
    { new: true },
  );
  if (doc)
    res.send(`成功更新 ${doc.className} 的班级理念至 ${doc.classConcept}`);
  else res.send(`更新失败 TAT`);
});

app.post('/api/addCourse', async (req, res) => {
  const Course = mongoose.model('Course');

  const { course } = req.body;
  let temp = new Course();
  for (const [key, value] of Object.entries(course)) {
    temp[key] = value;
  }

  temp.save((err) => {
    if (err) res.send('添加失败 TAT');
    else res.send('添加成功！');
  });
});

app.get('/api/getCourses', async (req, res) => {
  const Course = mongoose.model('Course');
  const { type } = req.query;

  let docs = await Course.find({ type }).sort({ date: 1 });
  if (docs) {
    res.send(docs);
  } else res.status(401).send('数据库查找错误 \uD83D\uDE30');
});

app.get('/api/getPlayer', (req, res) => {
  const User = mongoose.model('User');

  const { username } = req.query;
  User.findOne({ username }, (err, user) => {
    if (err) {
      res.status(500).send('服务器错误 \ud83d\ude2d');
    } else if (!user) {
      console.log("user doesn't exist");
      res.status(401).send('数据库查找错误 \uD83D\uDE30');
    } else {
      res.send(user);
    }
  });
});

app.post('/api/login', (req, res) => {
  const User = mongoose.model('User');

  const { username, classId } = req.body;
  User.findOne({ username }, (err, user) => {
    if (err) {
      res.status(500).send('服务器错误 \ud83d\ude2d');
    } else if (!user) {
      console.log("user doesn't exist");
      res.status(401).send('账号不存在 \uD83D\uDE30');
    } else if (user && user.classId !== classId) {
      console.log("user class doesn't match");
      res.status(401).send('没有找到你的班级哦 \uD83D\uDE30');
    } else {
      let options = {
        maxAge: 1000 * 60 * 60 * 24, // would expire after a day
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
