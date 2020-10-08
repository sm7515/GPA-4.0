import React, { useState } from 'react';
import axios from 'axios';
import { apiUrl } from '../../../config';
import './index.css';

export default function Score({ classes }) {
  const [id, setId] = useState(-1);
  const [score, setScore] = useState(null);

  const handleSubmit = () => {
    if (id === -1) alert('请选择一个班级哦 \uD83D\uDE0A');
    else if (isNaN(parseInt(score))) {
      alert('请输入正确的积分哦 \uD83D\uDE0A');
    } else {
      const num = parseInt(score);
      axios
        .post(`${apiUrl}/updateScore`, { id, score: num })
        .then((res) => {
          alert(res.data);
        })
        .catch((err) => {
          alert(err);
        });
    }
  };

  return (
    <div className='score'>
      <div className='class-col'>
        {classes &&
          classes.map((item) => {
            return (
              <button
                type='button'
                key={item.id}
                className={`${item.id === id ? 'selected' : ''}`}
                onClick={() => setId(item.id)}
              >
                {item.value}
              </button>
            );
          })}
      </div>
      <div className='update-score'>
        <input
          inputMode='numeric'
          name='score'
          placeholder='积分'
          onChange={(e) => {
            setScore(e.currentTarget.value);
          }}
          required
        />
        <button type='submit' onClick={() => handleSubmit()}>
          更新
        </button>
      </div>
    </div>
  );
}
