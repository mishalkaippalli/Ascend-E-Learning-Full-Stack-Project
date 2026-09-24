import api from '../api/axios'

export interface CurrentUser {
  id: string
  name: string
  email: string
  role: string
  emailVerified: boolean
}

export async function getCurrentUser(): Promise<CurrentUser> {
  
  const response = await api.get<{ success: boolean; data: CurrentUser }>('/users/me')         // Fetches the authenticated user; Axios adds the access token automatically.

  return response.data.data
}