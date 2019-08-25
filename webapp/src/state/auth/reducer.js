import {
  LOGIN,
  APP_LOAD,
  REDIRECT,
  LOGOUT,
  LOGIN_PAGE_UNLOADED,
  UPDATE_FIELD_AUTH
} from './actions';

const defaultState = {
  token: null
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
          ...state,
          redirectTo: action.error ? null : '/staff',
          token: action.error ? null : action.payload.token,
          currentUser: action.error ? null : action.payload.user,
          inProgress: false,
          errors: action.error ? action.payload.errors : null
        };
    case LOGIN_PAGE_UNLOADED:
      return {...state, errors: null};
    case UPDATE_FIELD_AUTH:
      return { ...state, [action.key]: action.value };
    case APP_LOAD:
          return {
            ...state,
            token: action.token || null,
            appLoaded: true,
            currentUser: action.payload ? action.payload : null
          };
    case REDIRECT:
      return { ...state, redirectTo: null };
    case LOGOUT:
      return { ...state, redirectTo: '/', token: null, currentUser: null };
    default:
      return state;
  }

  return state;
};
