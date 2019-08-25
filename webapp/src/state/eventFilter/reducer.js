import {
  SELECTED_CITY,
} from './actions';

export default (state = {}, action) => {
  switch (action.type) {
    case SELECTED_CITY:
      return {
        ...state,
        city: action.city,
      };
    default:
      return state;
  }
};