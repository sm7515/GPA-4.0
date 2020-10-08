import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { apiUrl, baseUrl } from '../../../config';
import './index.css';

import Dropdown from '../Dropdown';
import Score from './score';
import CourseInfo from './course';

export default function Admin() {
  const [classes, setClasses] = useState([]);
  const [clear, setClear] = useState(false);
  const [selectedTab, setTab] = useState({ value: 'score' });

  useEffect(() => {
    axios
      .get(`${apiUrl}/getClasses`, { params: { exludeAdmin: true } })
      .then((res) => {
        const allClasses = [...res.data];
        setClasses(allClasses);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  const handleLogout = () => {
    Cookies.remove('role');
    Cookies.remove('username');
    window.location.replace(`${baseUrl}/`);
  };

  return (
    <div className='admin container'>
      <div className='admin nav'>
        <span
          className={`admin nav-item tab ${
            selectedTab.value === 'score' ? 'selected' : ''
          }`}
          onClick={() => {
            setTab({ value: 'score' });
            setClear(!clear);
          }}
        >
          积分修改
        </span>
        <span className='admin nav-item'>
          <Dropdown
            title='课程信息'
            items={[
              { id: 0, value: '必修课' },
              { id: 1, value: '选修课' },
            ]}
            setSelected={setTab}
            label={false}
            clear={clear}
          />
        </span>
        <span className='admin nav-item logout'>
          <button
            onClick={() => {
              handleLogout();
            }}
            className='logout'
          >
            LOG OUT
          </button>
        </span>
      </div>

      {selectedTab.value === 'score' && <Score classes={classes} />}

      {(selectedTab.value === '选修课' || selectedTab.value === '必修课') && (
        <CourseInfo tab={selectedTab.value} />
      )}
    </div>
  );
}
