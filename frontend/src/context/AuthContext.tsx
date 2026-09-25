import { createContext, useState, useEffect } from 'react'
import { setAccessToken } from '../services/api/tokenHolder'
import { refreshAccessToken } from '../services/auth/authService'
import { getCurrentUser } from '../services/user/userService'


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

  const [accessToken, setAccessTokenState] = useState<string | null>(null)                    // Stores the current access token in memory.
  
  const [isLoading, setIsLoading] = useState(true)                                        // Tracks whether authentication initialization is still running.

  const isAuthenticated = user !== null

  
  const setCredentials = (                                                                 // Stores the user and access token after successful login.
    user: AuthUser,
    accessToken: string,
  ) => {
    setUser(user)
    setAccessTokenState(accessToken)
    setAccessToken(accessToken)                                      // Keep the access token available to Axios outside the React tree.
    setIsLoading(false)
  }

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const accessToken = await refreshAccessToken()
         
        setAccessTokenState(accessToken)                                              // Keep React state and the Axios token holder synchronized.
        setAccessToken(accessToken)                                                     // Store the refreshed token before making authenticated API requests.

        const user = await getCurrentUser()

        setUser(user)
      } catch {
        
        setUser(null)                                                                   // No valid refresh session means the user is not authenticated.
      } finally {
        setIsLoading(false)
      }
    }

    restoreSession()
  }, [])
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