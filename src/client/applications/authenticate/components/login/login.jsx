import React from 'react';
import { Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';
import LoginForm from './login_form';

import './login.css';

function Login() {
  return (
    <Paper elevation={2} className="paper-login">
      <LoginForm />
      <Link to="/register" className="form-link">Doesn&apos;t have an Account Yet!</Link>
    </Paper>
  );
}

export default Login;
