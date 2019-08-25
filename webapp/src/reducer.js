import article from './reducers/article';
import articleList from './reducers/articleList';
import eventFilter from './state/eventFilter/reducer';
import managedEvents from './state/managedEvents/reducer';
import upcomingEvents from './state/upcomingEvents/reducer';
import auth from './reducers/auth';
import { combineReducers } from 'redux';
import common from './reducers/common';
import editor from './reducers/editor';
import home from './reducers/home';
import profile from './reducers/profile';
import settings from './reducers/settings';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  article,
  articleList,
  eventFilter,
  managedEvents,
  upcomingEvents,
  auth,
  common,
  editor,
  home,
  profile,
  settings,
  router: routerReducer
});
