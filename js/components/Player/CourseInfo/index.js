import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function CourseInfo({ type, apiUrl }) {
  const [courses, setCourses] = useState([]);
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelected] = useState('');
  let [open, setOpen] = useState([]);

  useEffect(() => {
    axios
      .get(`${apiUrl}/getCourses`, { params: { type } })
      .then((res) => {
        let tempDates = [];
        let temp = res.data.map((ele) => {
          let date = new Date(ele.date);
          date = `${date.getMonth() + 1}/${date.getDate()}`;
          if (tempDates.indexOf(date) === -1) tempDates.push(date);
          return {
            ...ele,
            date,
          };
        });
        setCourses(temp);
        setDates(tempDates);
        let today = new Date();
        today = `${today.getMonth() + 1}/${today.getDate()}`;
        if (tempDates.indexOf(today) !== -1) {
          setSelected(today);
        } else setSelected(tempDates[0]);
      })
      .catch((err) => alert(err));
  }, [type]);

  return (
    <div className='course-wrapper'>
      <div className='date-nav'>
        {dates &&
          dates.map((ele, i) => {
            return (
              <span
                key={i}
                onClick={() => setSelected(ele)}
                className={`date-nav-item ${
                  selectedDate === ele ? 'selected' : ''
                }`}
              >
                {ele}
              </span>
            );
          })}
      </div>
      <div className='courses'>
        {courses &&
          courses.map((ele, i) => {
            if (ele.date === selectedDate) {
              return (
                <div className='course-item' key={i}>
                  <div className='course-name'>
                    <span>课程名称：</span>
                    <span>{ele.name}</span>
                  </div>
                  <div className='course-score'>
                    <span>积分：</span>
                    <span>{ele.score}</span>
                  </div>
                  {type === '必修课' && (
                    <div className='course-intro'>
                      <span>简介：</span>
                      <span>{ele.intro}</span>
                    </div>
                  )}

                  {type === '选修课' && (
                    <>
                      <button>
                        <span
                          className='material-icons detail'
                          onClick={() => {
                            let temp = [];
                            if (open.indexOf(i) === -1) temp = [...open, i];
                            else temp = open.filter((ele) => ele !== i);
                            setOpen(temp);
                          }}
                        >
                          more_horiz
                        </span>
                      </button>
                      <div
                        className={`${
                          open.indexOf(i) !== -1 ? 'show' : 'hide'
                        }`}
                      >
                        <div className='course-category'>
                          <span>课程类别：</span>
                          <span>{ele.category}</span>
                        </div>
                        <div className='course-category'>
                          <span>打卡要求：</span>
                          <span>{ele.req}</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              );
            }
          })}
      </div>
    </div>
  );
}
