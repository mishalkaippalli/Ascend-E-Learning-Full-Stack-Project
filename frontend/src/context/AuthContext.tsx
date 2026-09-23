import { createContext, useState } from 'react'

interface AuthUser {
  id: string
  name: string
  email: string
  role: string
  emailVerified: boolean
}

interface AuthContextValue {
  user: AuthUser | null
  accessToken: string | null
  isAuthenticated: boolean
  isLoading: boolean

  setCredentials: (
    user: AuthUser,
    accessToken: string,
  ) => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

function AuthProvider({ children }: { children: React.ReactNode }) {

  const [user, setUser] = useState<AuthUser | null>(null)                                // Stores the currently authenticated user.

  const [accessToken, setAccessToken] = useState<string | null>(null)                    // Stores the current access token in memory.
  
  const [isLoading, setIsLoading] = useState(true)                                        // Tracks whether authentication initialization is still running.

  const isAuthenticated = user !== null

  
  const setCredentials = (                                                                 // Stores the user and access token after successful login.
    user: AuthUser,
    accessToken: string,
  ) => {
    setUser(user)
    setAccessToken(accessToken)
    setIsLoading(false)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        isAuthenticated,
        isLoading,
        setCredentials,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider }
export default AuthContext