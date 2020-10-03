import React from 'react';
import axios from 'axios';
import { apiUrl, baseUrl } from '../../../config';
import './index.css';

export default function Login() {
  const handleSubmit = (e) => {
    const username = e.currentTarget.username.value;
    e.preventDefault();
    axios
      .post(`${apiUrl}/login`, { username })
      .then((res) => {
        const role = res.data;
        const url = role === 'admin' ? 'admin' : 'course';
        window.location.replace(`${baseUrl}/${url}`);
      })
      .catch((err) => {
        console.log(err);
        err.response && alert(err.response.data);
      });
  };
  return (
    <form onSubmit={(e) => handleSubmit(e)} className='form login'>
      <div className='form__field'>
        <label htmlFor='NetId'>
          <img
            className='icon'
            src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/user_icon_copy.png'
          />
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
      <div className='form__field'>
        <input type='submit' value='Sign In' />
      </div>
    </form>
  );
}
