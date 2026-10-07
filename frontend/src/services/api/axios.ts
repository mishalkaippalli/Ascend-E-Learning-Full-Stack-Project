import axios, { type InternalAxiosRequestConfig } from 'axios'
import {
  getAccessToken,
  setAccessToken,
} from './tokenHolder'
import { refreshAccessToken } from '../auth/authService'

interface RetryableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
})

api.interceptors.request.use((config) => {
  const accessToken = getAccessToken()


  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`                                        // Attach the in-memory access token to authenticated API requests.
  }

  return config
})

api.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest =
      error.config as RetryableRequestConfig | undefined

    const isRefreshRequest = originalRequest?.url === '/auth/refresh'

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !isRefreshRequest
    ) {
      originalRequest._retry = true

      try {
        const accessToken = await refreshAccessToken()

        setAccessToken(accessToken)

      
        originalRequest.headers.Authorization = `Bearer ${accessToken}`                                     // Retry the failed request using the newly refreshed access token.

        return api(originalRequest)
      } catch (refreshError) {
        console.error('Session refresh failed:', refreshError)
      }
    }

    return Promise.reject(error)
  },
)

export default api