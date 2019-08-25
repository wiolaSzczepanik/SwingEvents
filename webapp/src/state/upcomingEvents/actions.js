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

// commands

export function fetchUpcomingEventsIfNeeded(filter) {
    return (dispatch, getState) => {
       if (shouldFetchUpcomingEvents(getState(), filter.city)) {
         return dispatch(fetchUpcomingEvents(filter.city))
       }
    }
}

function shouldFetchUpcomingEvents(state, city) {
  if(!state.upcomingEvents || !state.upcomingEvents.events) {
    return true;
  }
  const events = state.upcomingEvents.events[city.key]
  if (!events) {
    return true
  } else if (events.isFetching) {
    return false
  } else {
    // always refresh when changing city selector, user may think it's always getting fresh data
    // to be replaced with more sophisticated caching strategy later (e.g. refresh when data is older than 5 mins)
    return state.upcomingEvents.lastCityFetched != city.key;
  }
}
function fetchUpcomingEvents(city) {
    return dispatch => {
        dispatch(requestedUpcomingEvents(city))

        return agent.requests2.get('/upcoming?city=' + city.key)
                              .then(events => dispatch(receivedUpcomingEvents(city, events)))
    }
}
