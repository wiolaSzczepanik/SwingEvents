// action types & action creators (events)

export const SELECTED_CITY = 'SELECTED_CITY';
function selectedCity(city) {
    return { type: SELECTED_CITY, city }
}

// commands

export function selectCity(city) {
    return function(dispatch) {
        dispatch(selectedCity(city));
    }
}
