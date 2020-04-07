import { useState, createContext } from 'react';

export const ResetContext = createContext(null);

export default function useResetState() {
  const [snackbarShow, setSnackbarShow] = useState(false);
  const [snackbarText, setSnackbarText] = useState('');

  function createSnackbarHandler(text) {
    return function createSnackbar() {
      setSnackbarText(text);
      return setSnackbarShow(true);
    };
  }

  function createSnackbarCloseHandler() {
    setSnackbarText('');
    return setSnackbarShow(false);
  }

  return ({
    snackbarShow,
    snackbarText,
    createSnackbarHandler,
    createSnackbarCloseHandler,
  });
}
