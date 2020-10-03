import React from 'react';
import { connect } from 'react-redux';
import AdminPresentational from './AdminPresentational';
import { setUser } from '../../actions/userActions';
import './index.css';

function Admin({ setUser }) {
  return <AdminPresentational setUser={setUser} />;
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => {
      dispatch(setUser(user));
    },
  };
};

export default connect(null, mapDispatchToProps)(Admin);
