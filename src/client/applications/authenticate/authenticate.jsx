import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import {
  CssBaseline, Container, Snackbar, Slide, Button,
} from '@material-ui/core';
import Login from './components/login/login';
import Register from './components/register/register';
import Reset from './components/reset/reset';
import useAuthState, { AuthContext } from './authenticate_state';

import '@fortawesome/fontawesome-free/js/all';
import './authenticate.css';

function AuthenticationRoute() {
  const {
    snackbarShow,
    snackbarText,
    createSnackbarHandler,
    createSnackbarCloseHandler,
  } = useAuthState();

  function redirectToGoogleLogin() {
    window.location = '/authentication/google';
    return 1;
  }

  return (
    <Container maxWidth="lg" className="center-container">
      <BrowserRouter>
        <CssBaseline />
        <Button onClick={redirectToGoogleLogin}>
          <i className="fab fa-google fa-3x google-icon" />
        </Button>
        <AuthContext.Provider value={{ createSnackbarHandler }}>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/reset" component={Reset} />
        </AuthContext.Provider>
      </BrowserRouter>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={snackbarShow}
        autoHideDuration={6000}
        message={snackbarText}
        onClose={createSnackbarCloseHandler}
        TransitionComponent={Slide}
        transitionDuration={300}
      />
    </Container>
  );
}

render(
  <AuthenticationRoute />,
  document.getElementById('root'),
);
