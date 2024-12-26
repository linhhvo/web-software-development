const timeoutMs = 5000;

const fetchWithErrorHandling = async (url, options) => {
    try {
        const response = await fetch(url, {
            signal: AbortSignal.timeout(timeoutMs),
            ...options,
        });

        if (!response.ok) {
            return { data: null, error: response.statusText };
        }

        const data = await response.json();
        return { data, error: null };
    } catch (error) {
        let message = error?.message
        if (error?.name === "TimeoutError") {
             message = "Timeout -- the request took too long.";
        }

        return { data: null, error: message };
    }
};

export {fetchWithErrorHandling}