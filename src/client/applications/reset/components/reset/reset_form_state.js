import { useContext } from 'react';
import { ResetContext } from '../../reset_state';
import { putReset } from './reset_api';

export default function useResetFormState() {
  const { createSnackbarHandler } = useContext(ResetContext);

  async function reset(values) {
    try {
      if (values.password === values.passwordConfirm) {
        await putReset(values);
        window.location = '/login';
        return 1;
      }
      return createSnackbarHandler('The Passwords Don\'t Match!')();
    } catch (err) {
      return createSnackbarHandler('Server Error, try Again Later')();
    }
  }

  return { reset };
}
