import api from './api/axios'

import type {
  ApiResponse,
  SignupDTO,
  SignupResponseDTO,
  VerifyEmailOtpDTO,
  LoginDTO,
  LoginResponseDTO
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

export async function verifyEmailOtp(
  data: VerifyEmailOtpDTO,
) {
  const response = await api.post(                                        // Sends the email and OTP to the backend for verification.
    '/auth/verify-otp',
    data,
  )

  return response.data
}

export async function login(
  data: LoginDTO,
): Promise<LoginResponseDTO> {

  const response = await api.post<ApiResponse<LoginResponseDTO>>(                // Sends login credentials and receives the access token + user data.
    '/auth/login',
    data,
  )

  return response.data.data
}