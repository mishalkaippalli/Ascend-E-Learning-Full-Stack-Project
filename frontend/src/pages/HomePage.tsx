import { useEffect } from 'react'

import { getCurrentUser } from '../services/user/userService'

function HomePage() {
  useEffect(() => {
    // Tests the protected API after the page loads.
    getCurrentUser()
      .then((user) => {
        console.log('Current user:', user)
      })
      .catch((error) => {
        console.error('Failed to fetch current user:', error)
      })
  }, [])

  return <h1>Home Page</h1>
}

export default HomePage