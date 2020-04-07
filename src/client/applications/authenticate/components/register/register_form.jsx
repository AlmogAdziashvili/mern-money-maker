import React from 'react';
import { useFormik } from 'formik';
import {
  TextField, Button,
} from '@material-ui/core';
import useRegisterFormState from './register_form_state';

import './register_form.css';

function RegisterForm() {
  const { register } = useRegisterFormState();

  const registerFormik = useFormik({
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
    },
    onSubmit: register,
  });
  return (
    <form onSubmit={registerFormik.handleSubmit} autoComplete="off" className="form-register">
      <TextField fullWidth name="email" type="email" label="Email Address" variant="outlined" onChange={registerFormik.handleChange} value={registerFormik.values.email} required />
      <TextField fullWidth name="firstName" type="text" label="First Name" variant="outlined" onChange={registerFormik.handleChange} value={registerFormik.values.firstName} required />
      <TextField fullWidth name="lastName" type="text" label="Last Name" variant="outlined" onChange={registerFormik.handleChange} value={registerFormik.values.lastName} required />
      <TextField fullWidth name="password" type="password" label="Password" variant="outlined" onChange={registerFormik.handleChange} value={registerFormik.values.password} required />
      <Button type="submit" variant="outlined">Register</Button>
    </form>
  );
}

export default RegisterForm;
