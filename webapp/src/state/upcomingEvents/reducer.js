import {
  REQUESTED_UPCOMING_EVENTS,
  RECEIVED_UPCOMING_EVENTS
} from './actions';

export default (state = {}, action) => {
  switch (action.type) {
    case RECEIVED_UPCOMING_EVENTS:
      const newEvents = {
         ...state.events,
         [action.city.key]: action.events,
      };
      return {
        ...state,
        events: newEvents,
        lastCityFetched: action.city.key,
      }
    default:
      return state;
  }
};
