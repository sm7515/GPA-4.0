require('./../public/db');
const mongoose = require('mongoose');
const xlsx = require('node-xlsx');

let obj = xlsx.parse(__dirname + '/groups.xlsx'); // parses a file

async function saveUser() {
  let { data } = obj[0];
  let classCnt = 1;
  let error = false;
  for (let i = 0; i < data.length; i++) {
    let curRow = data[i];
    if (curRow.length === 0) {
      classCnt++;
      continue;
    } else {
      if (curRow[1] === 'netid') {
        const Class = mongoose.model('Class');
        let temp = new Class();
        temp.classId = classCnt;
        temp.className = curRow[0];
        temp.classConcept = '';
        temp.classScore = 0;
        temp.rank = 0;
        let res = await temp.save();
        if (res) {
          console.log(`saved class ${temp.className}`);
          continue;
        } else {
          error = true;
          break;
        }
      }

      const User = mongoose.model('User');
      let user = new User();
      user.username = curRow[1];
      user.name = curRow[0];
      user.classId = classCnt;
      user.className = `${classCnt}班`;
      user.role = 'player';
      let res = await user.save();
      if (res) {
        console.log(`saved user ${user.name} to ${user.className}`);
        continue;
      } else {
        error = true;
        break;
      }
    }
  }

  return new Promise((fulfill, reject) => {
    if (error) {
      reject(false);
    } else {
      fulfill(true);
    }
  });
}

setTimeout(async () => {
  let res = await saveUser();
  if (res) exit();
  else console.log(res);
}, 2000);
