import { useContext } from 'react';
import { AuthContext } from '../../authenticate_state';
import { putReset } from './reset_api';

export default function useResetFormState() {
  const { createSnackbarHandler } = useContext(AuthContext);

  async function reset(values) {
    try {
      await putReset(values);
      return createSnackbarHandler('Check Your Mail!')();
    } catch ({ response }) {
      return createSnackbarHandler(response.data.detail)();
    }
  }

  return { reset };
}
