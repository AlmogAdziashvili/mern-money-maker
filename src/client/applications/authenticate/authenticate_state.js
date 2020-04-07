import { useState, createContext } from 'react';

export const AuthContext = createContext(null);

export default function useAuthState() {
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
