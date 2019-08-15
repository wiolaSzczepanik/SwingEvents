import {
  REQUESTED_UPCOMING_EVENTS,
  RECEIVED_UPCOMING_EVENTS,
  SELECTED_CITY,
} from './actions';

export default (state = initialState, action) => {
  switch (action.type) {
    case SELECTED_CITY:
      return {
        ...state,
        selectedCity: action.city,
        selectedEvents: computeSelectedEvents(state.events, action.city)    // TODO: replace with a redux selector
      };
    case RECEIVED_UPCOMING_EVENTS:
      const newEvents = {
         ...state.events,
         [action.city.key]: action.events,
      };
      return {
        ...state,
        events: newEvents,
        selectedEvents: computeSelectedEvents(newEvents, state.selectedCity)
      }
    default:
      return state;
  }
};

function computeSelectedEvents(events, city) {
    if (!events || !city) {
        return null
    }
    return events[city.key];
}

const initialState = {
    selectedCity: initialCity()
}

function initialCity() {
    const localStorageCity = window.localStorage.getItem('selectedCity');
    if (localStorageCity) {
        return JSON.parse(localStorageCity);
    } else {
        return {key: 'Kraków', locative: 'Krakowie'};
    }
}
