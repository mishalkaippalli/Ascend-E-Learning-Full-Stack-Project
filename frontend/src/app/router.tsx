import { createBrowserRouter } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import SignupPage from '../pages/auth/SignupPage'
import VerifyOtpPage from '../pages/auth/VerifyOtpPage'
import LoginPage from '../pages/auth/LoginPage'
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage'
import VerifyResetOtpPage from '../pages/auth/VerifyResetOtpPage'
import ResetPasswordPage from '../pages/auth/ResetPasswordPage'

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
  {
  path: '/forgot-password',
  element: <ForgotPasswordPage />,
  },
  {
  path: '/verify-reset-otp',
  element: <VerifyResetOtpPage />,
  },
  {
  path: '/reset-password',
  element: <ResetPasswordPage />,
  },
])

export default router