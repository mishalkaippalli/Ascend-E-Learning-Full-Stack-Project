export interface ApiResponse<T> {
  success: boolean
  data: T
}

export interface SignupDTO {
  name: string
  email: string
  password: string
}

export interface SignupResponseDTO {
  id: string
  name: string
  email: string
  role: string
  emailVerified: boolean
}

export interface LoginDTO {
  email: string
  password: string
}

export interface LoginResponseDTO {
  user: {
    id: string
    name: string
    email: string
    role: string
    emailVerified: boolean
  }
  accessToken: string
}