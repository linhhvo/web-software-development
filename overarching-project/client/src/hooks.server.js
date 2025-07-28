import {decodeJwt} from "jose";

const COOKIE_KEY = "token";

export const handle = async ({event, resolve}) => {
    const authCookie = event.cookies.get(COOKIE_KEY);
    if (authCookie) {
        try {
            const payload = decodeJwt(authCookie);
            event.locals.user = payload;
        } catch (e) {
            console.log(e);
        }
    }

    return await resolve(event);
};