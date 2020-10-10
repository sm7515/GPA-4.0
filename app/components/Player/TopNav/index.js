import React from 'react';
import Cookies from 'js-cookie';
import { Transition, animated } from 'react-spring/renderprops';
import './index.css';

export default function TopNav({ name, baseUrl }) {
  const handleLogout = () => {
    Cookies.remove('role');
    Cookies.remove('username');
    window.location.replace(`${baseUrl}/`);
  };

  return (
    <div className='top-nav'>
      <div className='hello-wrapper'>
        <Transition
          items='欢迎你，'
          trail={500}
          from={{ transform: 'translate3d(0,-40px,0)' }}
          enter={{ transform: 'translate3d(0,0px,0)' }}
          leave={{ transform: 'translate3d(0,-40px,0)' }}
        >
          {(item) => (props) => (
            <animated.div style={props} className='welcome'>
              {item}
            </animated.div>
          )}
        </Transition>

        <Transition
          items={name}
          trail={600}
          from={{ transform: 'translate3d(0,-100px,0) rotate(-45deg)' }}
          enter={{ transform: 'translate3d(0,0px,0) rotate(0)' }}
          leave={{ transform: 'translate3d(0,-40px,0)' }}
        >
          {(item) => (props) =>
            name && (
              <animated.div style={props} className='name'>
                &nbsp;&nbsp;{item}&nbsp;&nbsp;!
              </animated.div>
            )}
        </Transition>
      </div>
      <Transition
        items='LOG OUT'
        trail={500}
        from={{ transform: 'translate3d(0,-40px,0)' }}
        enter={{ transform: 'translate3d(0,0px,0)' }}
        leave={{ transform: 'translate3d(0,-40px,0)' }}
      >
        {(item) => (props) =>
          name && (
            <animated.div style={props} className='logout-wrapper'>
              <button
                onClick={() => {
                  handleLogout();
                }}
                className='logout-button'
              >
                {item}
              </button>
            </animated.div>
          )}
      </Transition>
    </div>
  );
}
