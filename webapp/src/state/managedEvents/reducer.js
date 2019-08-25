import {
  REQUESTED_MANAGED_EVENTS,
  RECEIVED_MANAGED_EVENTS,
} from './actions';

export default (state = {}, action) => {
  switch (action.type) {
    case RECEIVED_MANAGED_EVENTS:
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
