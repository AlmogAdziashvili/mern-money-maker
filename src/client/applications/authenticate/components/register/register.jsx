import React from 'react';
import { Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';
import RegisterForm from './register_form';

import './register.css';

function Register() {
  return (
    <Paper elevation={2} className="paper-register">
      <RegisterForm />
      <Link to="/login" className="form-link">Already Have an Account?</Link>
    </Paper>
  );
}

export default Register;
