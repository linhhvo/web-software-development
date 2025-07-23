import {PUBLIC_INTERNAL_API_URL} from "$env/static/public";
import {redirect} from "@sveltejs/kit";

export const load = async ({locals}) => {
    return locals;
};

const COOKIE_KEY = "cookie";

export const actions = {
    auth: async ({request, cookies}) => {
        const data = await request.formData();

        const response = await fetch(`${PUBLIC_INTERNAL_API_URL}/api/user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(Object.fromEntries(data))
        });

        // continue from here
        if (response.ok) {
            const responseCookies = response.headers.getSetCookie();
            const cookie = responseCookies.find((cookie) => cookie.startsWith(COOKIE_KEY));
            const cookieValue = cookie.split("=")[1].split(';')[0];
            cookies.set(COOKIE_KEY, cookieValue, {path: '/', secure: false});
            throw redirect(302, '/')
        }

        return await response.json();
    }
}