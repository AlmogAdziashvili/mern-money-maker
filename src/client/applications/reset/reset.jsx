import React from 'react';
import { render } from 'react-dom';
import {
  CssBaseline, Container, Snackbar, Slide,
} from '@material-ui/core';
import Reset from './components/reset/reset';
import useResetState, { ResetContext } from './reset_state';

import './reset.css';

function ResetPage() {
  const {
    snackbarShow,
    snackbarText,
    createSnackbarHandler,
    createSnackbarCloseHandler,
  } = useResetState();

  return (
    <Container maxWidth="lg" className="center-container">
      <CssBaseline />
      <ResetContext.Provider value={{ createSnackbarHandler }}>
        <Reset />
      </ResetContext.Provider>
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
  <ResetPage />,
  document.getElementById('root'),
);
