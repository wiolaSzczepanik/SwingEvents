import agent from '../../agent';

// action types & action creators (events)

export const RECEIVED_UPCOMING_EVENTS = 'RECEIVED_UPCOMING_EVENTS';
function receivedUpcomingEvents(city, events) {
    return { type: RECEIVED_UPCOMING_EVENTS, city, events }
}

export const REQUESTED_UPCOMING_EVENTS = 'REQUESTED_UPCOMING_EVENTS';
function requestedUpcomingEvents(city) {
    return { type: REQUESTED_UPCOMING_EVENTS, city }
}

export const SELECTED_CITY = 'SELECTED_CITY';
function selectedCity(city) {
    return { type: SELECTED_CITY, city }
}

// commands

export function selectCity(city) {
    return function(dispatch) {
        window.localStorage.setItem('selectedCity', JSON.stringify(city))
        dispatch(selectedCity(city));
        dispatch(fetchUpcomingEventsIfNeeded(city));
    }
}

function fetchUpcomingEventsIfNeeded(city) {
    return (dispatch, getState) => {
       if (shouldFetchUpcomingEvents(getState(), city)) {
         return dispatch(fetchUpcomingEvents(city))
       }
    }
}

function shouldFetchUpcomingEvents(state, city) {
  const events = state.upcomingEvents[city]
  if (!events) {
    return true
  } else if (events.isFetching) {
    return false
  } else {
    // always refresh when changing city selector, user may think it's always getting fresh data
    // to be replaced with more sophisticated caching strategy later (e.g. refresh when data is older than 5 mins)
    return state.selectedCity != city;
  }
}
function fetchUpcomingEvents(city) {
    return dispatch => {
        dispatch(requestedUpcomingEvents(city))

        return agent.requests2.get('/upcoming?city=' + city.key)
                              .then(events => dispatch(receivedUpcomingEvents(city, events)))
    }
}
