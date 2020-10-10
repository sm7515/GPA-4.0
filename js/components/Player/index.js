import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { apiUrl, baseUrl } from '../../../config';
import Cookies from 'js-cookie';

import TopNav from './TopNav';
import BottomNav from './BottomNav';
import ClassInfo from './ClassInfo';
import CourseInfo from './CourseInfo';
import './index.css';

export default function Player() {
  const [player, setPlayer] = useState(undefined);
  const [tab, setTab] = useState('班级信息');

  useEffect(() => {
    const username = Cookies.get('username');

    axios
      .get(`${apiUrl}/getPlayer`, { params: { username } })
      .then((res) => setPlayer(res.data))
      .catch((err) => alert(err));
  }, []);

  const render = (option) => {
    switch (option) {
      case '班级信息':
        return (
          player && (
            <ClassInfo
              classId={player.classId}
              apiUrl={apiUrl}
              className={player.className}
            />
          )
        );
      case '必修课':
      case '选修课':
        return <CourseInfo type={option} apiUrl={apiUrl}></CourseInfo>;
      default:
        break;
    }
  };

  return (
    <div className='player-wrapper'>
      {player && <TopNav name={player.name} baseUrl={baseUrl} />}
      {render(tab)}
      <BottomNav setTab={setTab} tab={tab} />
    </div>
  );
}
