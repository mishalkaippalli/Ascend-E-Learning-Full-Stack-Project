import type { FormEvent } from 'react'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

import { resetPassword } from '../../services/auth/authService'
import { resetPasswordSchema } from '../../schemas/authSchema'

function ResetPasswordPage() {
  const location = useLocation()
  const navigate = useNavigate()

  const resetToken = location.state?.resetToken

  const [newPassword, setNewPassword] = useState('')
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!resetToken) {
      
      navigate('/forgot-password', { replace: true })                                    // Prevent users from entering the reset step without a verified OTP.
    }
  }, [resetToken, navigate])

  if (!resetToken) {
    return null
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setError('')
    setSuccessMessage('')

    const result = resetPasswordSchema.safeParse({
      resetToken,
      newPassword,
    })

    if (!result.success) {
      setError(result.error.issues[0].message)
      return
    }

    setIsLoading(true)

    try {
      const response = await resetPassword(result.data)

      console.log('Password reset successful:', response)

      setSuccessMessage(response.message)

      setTimeout(() => {
        navigate('/login', { replace: true })
      }, 1000)
    } catch (error) {
      console.error('Password reset failed:', error)

      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.message ||
            'Unable to reset your password. Please try again.',
        )
      } else {
        setError('Something went wrong. Please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-background px-6 py-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-md flex-col justify-center">
        <div className="mb-10">
          <p className="text-center text-sm font-semibold tracking-wide text-accent">
            ASCEND
          </p>

          <h1 className="mt-6 font-serif text-5xl leading-tight text-primary">
            Create a new password
          </h1>

          <p className="mt-3 text-base text-secondary">
            Choose a new password for your account.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="newPassword"
              className="mb-2 block text-sm font-medium text-primary"
            >
              New password
            </label>

            <input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(event) => {
                setNewPassword(event.target.value)
                setError('')
                setSuccessMessage('')
              }}
              placeholder="Enter your new password"
              className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-primary outline-none transition focus:border-accent"
            />

            {error && (
              <p className="mt-2 text-sm text-error">
                {error}
              </p>
            )}

            {successMessage && (
              <p className="mt-2 text-sm text-success">
                {successMessage}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-primary px-4 py-3 font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? 'Updating password...' : 'Update password'}
          </button>
        </form>
      </div>
    </main>
  )
}

export default ResetPasswordPage

