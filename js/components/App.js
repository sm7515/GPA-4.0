import React from 'react';
import { Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';
import '../styles.css';

import Login from './Login';
import Course from './Course';
import Admin from './Admin';

export default function App() {
  return (
    <div className='app'>
      <Router>
        <Route path={['/', '/app/']}>
          {Cookies.get('username') ? (
            Cookies.get('role') === 'admin' ? (
              <Redirect to='/app/admin' />
            ) : (
              <Redirect to='/app/course' />
            )
          ) : (
            <Login />
          )}
        </Route>
        <Route path='/app/course'>
          {Cookies.get('role') === 'player' && Cookies.get('username') ? (
            <Course />
          ) : (
            <Redirect to='/' />
          )}
        </Route>
        <Route exact path='/app/admin'>
          {Cookies.get('role') === 'admin' && Cookies.get('username') ? (
            <Admin />
          ) : (
            <Redirect to='/' />
          )}
        </Route>
      </Router>
    </div>
  );
}
