import agent from '../agent';
import {
  LOGIN,
  LOGOUT
} from './auth/actions';

const localStorageMiddleware = store => next => action => {
  console.log(action);
  if (action.type === LOGIN) {
    if (!action.error) {
      window.localStorage.setItem('jwt', JSON.stringify(action.payload.token));
      agent.setToken(action.payload.token);
    }
  } else if (action.type === LOGOUT) {
    window.localStorage.setItem('jwt', '');
    agent.setToken(null);
  }

  next(action);
};

export { localStorageMiddleware }
