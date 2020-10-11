import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Transition, animated } from 'react-spring/renderprops';
import './index.css';

export default function LeaderBoard({ apiUrl }) {
  const [topOne, setTopOne] = useState([]);
  const [groups, setGroups] = useState([]);
  const [show, setShow] = useState(true);

  useEffect(() => {
    axios
      .get(`${apiUrl}/getClasses`, {
        params: { exludeAdmin: true, rank: true },
      })
      .then((res) => {
        let one = res.data.filter((ele) => ele.rank === 1);
        let two = res.data.map((ele) => ele);
        setTopOne(one);
        setGroups(two);
      });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setShow(!show);
    }, 2000);
  }, [topOne]);

  return (
    <div className='leaderboard-wrapper'>
      {
        <Transition
          items={show}
          config={{ mass: 1, tension: 280, friction: 60 }}
          from={{ transform: 'scale(0)', opacity: 0 }}
          enter={{ transform: 'scale(1)', opacity: 1 }}
          leave={{ opacity: 0, transform: 'scale(1)' }}
        >
          {(show) =>
            show &&
            ((props) => (
              <animated.div
                className={`animation wrapper ${show ? 'move' : ''}`}
                style={props}
              >
                <div className='banner-title'>
                  <div>热烈祝贺以下班级获得一位</div>
                </div>

                <div className='animation item-wrapper'>
                  {topOne.length !== 0 &&
                    topOne.map((ele) => (
                      <div key={ele.id} className='animation item'>
                        <div className='name'>{ele.name}&nbsp;&nbsp;班</div>
                      </div>
                    ))}
                </div>
              </animated.div>
            ))
          }
        </Transition>
      }
      {groups && (
        <div className={`groups ${!show ? 'show' : 'hide'}`}>
          {groups.map((ele) => (
            <div className='group-item' key={ele.id}>
              <div className='rank'>{ele.rank}</div>
              <div className={`name ${ele.rank === 1 ? 'large' : ''}`}>
                {ele.name}&nbsp;&nbsp;班
              </div>
              <div>{ele.score}</div>
              <span
                className={`material-icons ${
                  ele.rank === 1 ? 'showIcon' : 'hideIcon'
                }`}
              >
                flag
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
