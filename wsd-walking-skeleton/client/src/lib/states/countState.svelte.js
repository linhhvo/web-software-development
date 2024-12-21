import { browser } from "$app/environment";

const COUNT_KEY = "count";
let initialCount = 0;
if (browser && localStorage.hasOwnProperty(COUNT_KEY)) {
    initialCount = parseInt(localStorage.getItem(COUNT_KEY));
}

let countState = $state(initialCount);

const useCountState = () => {
    return {
        get count() {
            return countState;
        },
        increment: () => {
            countState++;
            localStorage.setItem(COUNT_KEY, countState);
        },
    };
};

export { useCountState };
