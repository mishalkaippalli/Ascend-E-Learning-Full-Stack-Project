import api from './api/axios'
import type {
  ApiResponse,
  SignupDTO,
  SignupResponseDTO,
} from '../types/auth'

export async function signup(
  data: SignupDTO,
): Promise<SignupResponseDTO> {
  const response = await api.post<ApiResponse<SignupResponseDTO>>(
    '/auth/signup',
    data,
  )

  return response.data.data
}