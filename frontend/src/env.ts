const env = {
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000',
    apiOrigin: import.meta.env.VITE_APP_API_ORIGIN ?? '/api',
};

export { env };
