import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../authenticate_state';
import { postRegister } from './register_api';

export default function useRegisterFormState() {
  const { createSnackbarHandler } = useContext(AuthContext);
  const history = useHistory();

  async function register(values) {
    try {
      await postRegister(values);
      return history.push('/login');
    } catch ({ response }) {
      return createSnackbarHandler(response.data.detail)();
    }
  }

  return { register };
}
