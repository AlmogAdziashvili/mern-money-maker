import React from 'react';
import { Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';
import ResetForm from './reset_form';

import './reset.css';

function Reset() {
  return (
    <Paper elevation={2} className="paper-reset">
      <ResetForm />
      <Link to="/login" className="form-link">Oops I Didn&apos;t Forgot my Password</Link>
    </Paper>
  );
}

export default Reset;
