/** Base URL for API calls. Empty = same origin (use Vite dev proxy at `/api`). Set `VITE_API_URL` when the SPA is hosted separately from the API. */
export const apiBaseUrl = (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, '') ?? ''
