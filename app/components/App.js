import React from 'react';
import { Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';
import '../styles.css';

import Login from './Login';
import Player from './Player';
import Admin from './Admin';

export default function App() {
  return (
    <div className='app'>
      <Router basename="/2020/GPA-4.0/">
        <Route exact path={['/', '/app/']}>
          {Cookies.get('username') ? (
            Cookies.get('role') === 'admin' ? (
              <Redirect to='/app/admin' />
            ) : (
              <Redirect to='/app/player' />
            )
          ) : (
            <Login />
          )}
        </Route>
        <Route exact path='/app/player'>
          {Cookies.get('role') === 'player' && Cookies.get('username') ? (
            <Player />
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
