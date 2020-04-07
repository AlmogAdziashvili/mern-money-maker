import { useContext } from 'react';
import { AuthContext } from '../../authenticate_state';
import { postLogin } from './login_api';

export default function useLoginFormState() {
  const { createSnackbarHandler } = useContext(AuthContext);

  async function login(values) {
    try {
      await postLogin(values);
      window.location = '/';
      return 1;
    } catch ({ response }) {
      return createSnackbarHandler(response.data.detail)();
    }
  }

  return { login };
}
