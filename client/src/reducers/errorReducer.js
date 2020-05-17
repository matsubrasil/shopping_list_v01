import { GET_ERRORS, CLEAR_ERRORS } from '../actions/types';

const INITIAL_STATE = {
  warning_msg: [],
  status: null,
  id: null,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_ERRORS:
      return {
        warning_msg: action.payload.msg,
        status: action.payload.status,
        id: action.payload.id,
      };

    case CLEAR_ERRORS:
      console.log('entrei no errorReducer.CLEAR_ERRORS');
      return {
        warning_msg: {},
        status: null,
        id: null,
      };

    default:
      return state;
  }
}
