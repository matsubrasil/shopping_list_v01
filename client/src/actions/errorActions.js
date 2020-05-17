import { GET_ERRORS, CLEAR_ERRORS } from './types';

// RETURNS ERRORS
export const returnErrors = (msg, status, id = null) => {
  return {
    type: GET_ERRORS,
    payload: { msg, status, id },
  };
};

// CLEAR ERRORS
export const clearErrors = () => {
  console.log('errorActions:clearErrors() =***==>');
  return {
    type: CLEAR_ERRORS,
  };
};
