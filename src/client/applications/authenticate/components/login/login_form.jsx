import React from 'react';
import { useFormik } from 'formik';
import {
  TextField, Button,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import './login_form.css';
import useLoginFormState from './login_form_state';

function LoginForm() {
  const { login } = useLoginFormState();

  const loginFormik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: login,
  });

  return (
    <form onSubmit={loginFormik.handleSubmit} autoComplete="off" className="form-login">
      <TextField fullWidth name="email" type="email" label="Email Address" variant="outlined" onChange={loginFormik.handleChange} value={loginFormik.values.email} required />
      <TextField fullWidth name="password" type="password" label="Password" variant="outlined" onChange={loginFormik.handleChange} value={loginFormik.values.password} required />
      <Link to="/reset" className="form-link">Forgot Password?</Link>
      <Button type="submit" variant="outlined">Sign In</Button>
    </form>
  );
}

export default LoginForm;
