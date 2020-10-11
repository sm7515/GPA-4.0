require('./../public/db');
const mongoose = require('mongoose');

const args = process.argv.slice(2);

async function saveAdmin() {
  for (let i = 0; i < args.length; i++) {
    const User = mongoose.model('User');
    let temp = new User();
    temp.username = args[i];
    temp.role = 'admin';
    temp.classId = 0;
    temp.className = '管理员';
    let res = await temp.save();
    if (res) {
      console.log(`saved ${args[i]} as admin successfully`);
    } else console.log(`something went wrong`);
  }
}

setTimeout(() => {
  saveAdmin();
}, 2000);
