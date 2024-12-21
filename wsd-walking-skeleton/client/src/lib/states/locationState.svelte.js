import { browser } from "$app/environment"

const LOCATION_KEY = "location"

let initialLocation = { x: 0, y: 0 };

if (browser && localStorage.hasOwnProperty(LOCATION_KEY)) {
    initialLocation = JSON.parse(localStorage.getItem(LOCATION_KEY))
}

let locationState = $state(initialLocation);

const useLocationState = () => {
    return {
        get location() {
            return locationState;
        },
        up: () => {
            locationState.y++;
            localStorage.setItem(LOCATION_KEY, JSON.stringify(locationState))
        },
        down: () => {
            locationState.y--
            localStorage.setItem(LOCATION_KEY, JSON.stringify(locationState))
        },
        left: () => {
            locationState.x--
            localStorage.setItem(LOCATION_KEY, JSON.stringify(locationState))
        },
        right: () => {
            locationState.x++
            localStorage.setItem(LOCATION_KEY, JSON.stringify(locationState))
        }
    };
};

export { useLocationState };
