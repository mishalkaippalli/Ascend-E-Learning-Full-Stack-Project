import axios from 'axios'
import { getAccessToken } from './tokenHolder'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
})

api.interceptors.request.use((config) => {
  const accessToken = getAccessToken()

  if (accessToken) {                                                                              // Attach the in-memory access token to authenticated API requests.
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
})

export default api