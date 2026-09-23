import { createBrowserRouter } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import SignupPage from '../pages/auth/SignupPage'
import VerifyOtpPage from '../pages/auth/VerifyOtpPage'
import LoginPage from '../pages/auth/LoginPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
  {
    path: '/verify-otp',
    element: <VerifyOtpPage />,
  },
  {
  path: '/login',
  element: <LoginPage />,
  },
])

export default router