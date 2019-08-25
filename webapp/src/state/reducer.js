import auth from './auth/reducer';
import eventFilter from './eventFilter/reducer';
import managedEvents from './managedEvents/reducer';
import upcomingEvents from './upcomingEvents/reducer';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  eventFilter,
  managedEvents,
  upcomingEvents,
  auth,
  router: routerReducer
});
