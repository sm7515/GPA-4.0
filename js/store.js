import { createStore, combineReducers } from 'redux';

const user = (
  state = {
    username: '',
    name: '',
    classId: 0,
    className: '',
    score: 0,
    classScore: 0,
    role: '',
  },
  action,
) => {
  switch (action.type) {
    case 'SET_USER':
      state = { ...state, ...action.payload };
      break;
    case 'SET_LOGIN':
      state = {};
      break;
    default:
      break;
  }
  return state;
};

export default createStore(
  combineReducers({ user }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
