import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { apiUrl, baseUrl } from '../../config';
import Dropdown from '../Dropdown';
import './index.css';

export default function Login() {
  const [selected, setSelected] = useState({ value: '', id: -1 });
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    axios
      .get(`${apiUrl}/getClasses`)
      .then((res) => {
        const allClasses = [...res.data];
        setClasses(allClasses);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  const handleSubmit = (e) => {
    if (selected.id === -1) alert('请输入班级哦 \uD83D\uDE0A');
    else {
      const username = e.currentTarget.username.value;
      e.preventDefault();
      axios
        .post(`${apiUrl}/login`, { username, classId: selected.id })
        .then((res) => {
          console.log(res);
          const role = res.data;
          const url = role === 'admin' ? 'admin' : 'course';
          console.log(`${baseUrl}/${url}`);
          window.location.replace(`${baseUrl}/${url}`);
        })
        .catch((err) => {
          console.log(err);
          err.response && alert(err.response.data);
        });
    }
  };

  return (
    <div className='login-wrapper'>
      <img src={`${apiUrl}/static/img/girl.png`} className='girl' />
      <img src={`${apiUrl}/static/img/boy.png`} className='boy' />

      <form onSubmit={(e) => handleSubmit(e)} className='form login'>
        <div className='form__field'>
          <label htmlFor='NetId'>
            <span className='material-icons icon'>perm_identity</span>
          </label>
          <input
            id='username'
            type='text'
            name='username'
            className='form__input'
            placeholder='Net Id'
            required
          />
        </div>
        <Dropdown
          setSelected={setSelected}
          items={classes}
          title='班级'
          label={true}
        />
        <div className='form__field'>
          <input type='submit' value='登陆' />
        </div>
      </form>
    </div>
  );
}
