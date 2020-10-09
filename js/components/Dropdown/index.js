import React, { useState, useEffect } from 'react';
import onClickOutside from 'react-onclickoutside';
import { Spring, animated } from 'react-spring/renderprops';
import './index.css';

function Dropdown({ setSelected, title, items, label, clear }) {
  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState({});

  const toggle = () => setOpen(!open);

  Dropdown.handleClickOutside = () => setOpen(false);

  useEffect(() => {
    return () => {
      setSelection({});
    };
  }, [clear]);

  function handleOnClick(item) {
    if (selection.id !== item.id) {
      setSelection(item);
      setSelected(item);
    }
    setOpen(false);
  }

  return (
    <div className='dd-container'>
      <div className='dd-wrapper'>
        {label && (
          <label className='dd-label'>
            <span className='material-icons icon'>school</span>
          </label>
        )}
        <div
          tabIndex={0}
          className='dd-header'
          role='button'
          onClick={() => toggle(!open)}
        >
          <div className='dd-header__title'>
            <p
              className={`dd-header__title--${
                JSON.stringify(selection) !== '{}' ? 'bold' : 'placeholder'
              }`}
            >
              {JSON.stringify(selection) !== '{}' ? selection.value : title}
            </p>
          </div>
          <div className='dd-header__action'>
            <p>
              {open ? (
                <span className='material-icons'>expand_more</span>
              ) : (
                <span className='material-icons'>expand_less</span>
              )}
            </p>
          </div>
        </div>
      </div>

      {
        <Spring
          force
          config={{ tension: 2000, friction: 150, precision: 1 }}
          from={{ height: !open ? 0 : 'auto' }}
          to={{ height: open ? 'auto' : 0 }}
        >
          {(props) => (
            <animated.ul
              className={`dd-list ${open ? 'show' : ''}`}
              style={props}
            >
              {items.map((item) => (
                <li className='dd-list-item' key={item.id}>
                  <button type='button' onClick={() => handleOnClick(item)}>
                    <span
                      className={`dd-list-item ${
                        item.id === selection.id && 'selected'
                      }`}
                    >
                      {item.value}
                    </span>
                  </button>
                </li>
              ))}
            </animated.ul>
          )}
        </Spring>
      }
    </div>
  );
}

const clickOutsideConfig = {
  handleClickOutside: () => Dropdown.handleClickOutside,
};

export default onClickOutside(Dropdown, clickOutsideConfig);
