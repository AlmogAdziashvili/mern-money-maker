import React from 'react';
import { useFormik } from 'formik';
import {
  TextField, Button,
} from '@material-ui/core';
import useResetFormState from './reset_form_state';

import './reset_form.css';

function ResetForm() {
  const { reset } = useResetFormState();

  const resetFormik = useFormik({
    initialValues: {
      password: '',
      passwordConfirm: '',
    },
    onSubmit: reset,
  });

  return (
    <form onSubmit={resetFormik.handleSubmit} autoComplete="off" className="form-reset">
      <TextField fullWidth name="password" type="text" label="Password" variant="outlined" onChange={resetFormik.handleChange} value={resetFormik.values.email} required />
      <TextField fullWidth name="passwordConfirm" type="text" label="Confirm Password" variant="outlined" onChange={resetFormik.handleChange} value={resetFormik.values.passwordConfirm} required />
      <Button type="submit" variant="outlined">Reset Password</Button>
    </form>
  );
}

export default ResetForm;
