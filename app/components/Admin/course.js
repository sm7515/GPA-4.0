import React, { useState } from 'react';
import axios from 'axios';
import { apiUrl } from '../../config';
import './index.css';
import Dropdown from '../Dropdown';

export default function CourseInfo({ tab }) {
  const [name, setName] = useState('');
  const [score, setScore] = useState('');
  const [category, setCategory] = useState({});
  const [date, setDate] = useState(undefined);
  const [intro, setIntro] = useState('');
  const [req, setReq] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isNaN(parseInt(score))) {
      alert('请输入正确的积分哦 \uD83D\uDE0A');
    } else if (tab === '选修课' && !category.value) {
      alert('请选择课程类别哦 \uD83D\uDE0A');
    } else {
      let course = { name, score, date, type: tab };
      if (tab === '必修课') {
        course.intro = intro;
      } else {
        course.category = category.value;
        course.req = req;
      }
      console.log(course);
      axios
        .post(`${apiUrl}/addCourse`, { course })
        .then((res) => alert(res.data))
        .catch((err) => alert(err));
    }
  };

  function renderName() {
    return (
      <span className='form__field'>
        <label htmlFor='name'>课程名称</label>
        <input
          type='text'
          name='name'
          onChange={(e) => {
            setName(e.currentTarget.value);
          }}
          required
        />
      </span>
    );
  }

  function renderScore() {
    return (
      <span className='form__field'>
        <label htmlFor='score'>课程积分</label>
        <input
          inputMode='numeric'
          name='score'
          onChange={(e) => {
            setScore(e.currentTarget.value);
          }}
          required
        />
      </span>
    );
  }

  function renderCategory() {
    return (
      <span className='form__field'>
        <label htmlFor='category'>课程类别</label>
        <span name='category' className='category'>
          <Dropdown
            title='课程类别'
            items={[
              { id: 0, value: '文娱' },
              { id: 1, value: '艺术' },
              { id: 2, value: '音乐' },
              { id: 3, value: '学习' },
              { id: 4, value: '体育' },
              { id: 5, value: '电竞' },
            ]}
            setSelected={setCategory}
            label={false}
          />
        </span>
      </span>
    );
  }

  function renderDate() {
    return (
      <span className='form__field'>
        <label htmlFor='date'>课程日期</label>
        <input
          type='date'
          name='date'
          min='2020-01-01'
          max='2020-12-31'
          onChange={(e) => {
            setDate(e.currentTarget.value);
          }}
          required
        />
      </span>
    );
  }
  function renderIntro() {
    return (
      <span className='form__field'>
        <label htmlFor='intro'>课程简介</label>
        <textarea
          name='intro'
          onChange={(e) => {
            setIntro(e.currentTarget.value);
          }}
          required
        />
      </span>
    );
  }
  function renderReq() {
    return (
      <span className='form__field'>
        <label htmlFor='requirement'>打卡条件</label>
        <textarea
          name='requirement'
          onChange={(e) => {
            setReq(e.currentTarget.value);
          }}
          required
        />
      </span>
    );
  }

  return (
    <div className='update-course'>
      <form className='form' onSubmit={(e) => handleSubmit(e)}>
        {tab === '选修课' && renderCategory()}
        {renderName()}
        {renderDate()}
        {renderScore()}
        {tab === '选修课' && renderReq()}
        {tab === '必修课' && renderIntro()}
        <button type='submit'>添加</button>
      </form>
    </div>
  );
}
