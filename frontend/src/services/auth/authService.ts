import api from '../api/axios'

import type {
  ApiResponse,
  SignupDTO,
  SignupResponseDTO,
  VerifyEmailOtpDTO,
  LoginDTO,
  LoginResponseDTO,
  VerifyResetOtpDTO,
  VerifyResetOtpResponseDTO,
  ResetPasswordDTO
} from '../../types/auth'


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

export async function refreshAccessToken(): Promise<string> {
  
  const response = await api.post<ApiResponse<{ accessToken: string }>>(                         // Requests a new access token using the HttpOnly refresh-token cookie.   // refresh token is attached by browser automaticalay as we set withCredentials: true                                                                                                    
    '/auth/refresh',
  )

  return response.data.data.accessToken
}

export async function forgotPassword(
  email: string,
): Promise<{ success: boolean; message: string }> {
  // Requests a password-reset OTP without revealing whether the email is registered.
  const response = await api.post<{ success: boolean; message: string }>(
    '/auth/forgot-password',
    { email },
  )

  return response.data
}

export async function verifyResetOtp(
  data: VerifyResetOtpDTO,
): Promise<VerifyResetOtpResponseDTO> {
  
  const response = await api.post<ApiResponse<VerifyResetOtpResponseDTO>>(
    '/auth/verify-reset-otp',                                                                      // Verifies the password-reset OTP and returns a short-lived reset token.
    data,
  )

  return response.data.data
}

export async function resetPassword(
  data: ResetPasswordDTO,
): Promise<{ success: boolean; message: string }> {
  
  const response = await api.post<{ success: boolean; message: string }>(         // Completes the password reset using the token issued after OTP verification.
    '/auth/reset-password',
    data,
  )

  return response.data
}

export async function resendEmailOtp(
  email: string,
): Promise<{ success: boolean; message: string }> {
  
  const response = await api.post<{ success: boolean; message: string }>(                  // Requests a new email-verification OTP for the current signup flow.
    '/auth/resend-otp',
    { email },
  )

  return response.data
}