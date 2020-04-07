import React from 'react';
import { Paper } from '@material-ui/core';
import ResetForm from './reset_form';

import './reset.css';

function Reset() {
  return (
    <Paper elevation={2} className="paper-reset">
      <ResetForm />
    </Paper>
  );
}

export default Reset;
