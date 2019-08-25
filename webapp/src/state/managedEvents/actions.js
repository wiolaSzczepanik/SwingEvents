import agent from '../../agent';

// action types & action creators (events)

export const RECEIVED_MANAGED_EVENTS = 'RECEIVED_MANAGED_EVENTS';
function receivedManagedEvents(city, events) {
    return { type: RECEIVED_MANAGED_EVENTS, city, events }
}

export const REQUESTED_MANAGED_EVENTS = 'REQUESTED_MANAGED_EVENTS';
function requestedManagedEvents(city) {
    return { type: REQUESTED_MANAGED_EVENTS, city }
}

// commands

export function refreshManagedEvents() {
    return (dispatch, getState) => {
       return dispatch(fetchManagedEvents(getState().eventFilter.city))
    }
}

export function fetchManagedEventsIfNeeded(filter) {
    return (dispatch, getState) => {
       if (shouldFetchManagedEvents(getState(), filter.city)) {
         return dispatch(fetchManagedEvents(filter.city))
       }
    }
}

function shouldFetchManagedEvents(state, city) {
  if(!state.managedEvents || !state.managedEvents.events) {
    return true;
  }
  const events = state.managedEvents.events[city.key]
  if (!events) {
    return true
  } else if (events.isFetching) {
    return false
  } else {
    // always refresh when changing city selector, user may think it's always getting fresh data
    // to be replaced with more sophisticated caching strategy later (e.g. refresh when data is older than 5 mins)
    return state.managedEvents.lastCityFetched != city.key;
  }
}
function fetchManagedEvents(city) {
    return dispatch => {
        dispatch(requestedManagedEvents(city))

        return agent.requests2.get('/upcoming?city=' + city.key)
                              .then(events => dispatch(receivedManagedEvents(city, events)))
    }
}
