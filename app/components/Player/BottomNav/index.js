import React from 'react';
import { Spring, animated } from 'react-spring/renderprops';

import './index.css';

const options = ['班级信息', '必修课', '选修课', '光荣榜'];

export default function BottomNav({ setTab, tab }) {
  const handleClick = (ele) => {
    setTab(ele);
  };

  return (
    <Spring
      force
      delay={500}
      duration={4}
      config={{ tension: 280, friction: 60 }}
      from={{ opacity: 0 }}
      to={{ opacity: 1 }}
    >
      {(props) => (
        <div className='bottom-nav' style={props}>
          {options.map((ele, i) => (
            <animated.div
              key={i}
              className={`bottom-nav-item ${tab === ele ? 'selected' : ''}`}
              onClick={() => handleClick(ele)}
            >
              {ele}
            </animated.div>
          ))}
        </div>
      )}
    </Spring>
  );
}
