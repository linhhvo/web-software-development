import { PUBLIC_API_URL } from "$env/static/public";
import {fetchWithErrorHandling} from "$lib/apis/fetchWIthErrorHandling.js";

const timeoutMs = 5000;


const getData = async (id) => {
    return await fetchWithErrorHandling(`${PUBLIC_API_URL}/${id}`);
};

export { getData };