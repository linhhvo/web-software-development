import { PUBLIC_JOKES_API_URL } from "$env/static/public"

const getJoke = async () => {
    const res = await fetch(`${PUBLIC_JOKES_API_URL}/random`)
    return await res.json()
}

export {getJoke}