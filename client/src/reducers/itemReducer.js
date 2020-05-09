import { GET_ITEMS, ADD_ITEM, DELETE_ITEM } from './../actions/types';
import { v4 as uuidv4 } from 'uuid';

const INITIAL_STATE = {
  items: [
    {
      id: uuidv4(),
      name: 'eggs',
    },
    {
      id: uuidv4(),
      name: 'milk',
    },
    {
      id: uuidv4(),
      name: 'coffee',
    },
  ],
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };

    case ADD_ITEM:
      return {
        ...state,
        items: [action.payload, ...state.items],
      };
    default:
      return state;
  }
}
