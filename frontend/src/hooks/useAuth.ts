import { useContext } from 'react'
import AuthContext from '../context/AuthContext'

function useAuth() {

  const context = useContext(AuthContext)                                                      // Provides a simple way for components to access authentication state.

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}

export default useAuth