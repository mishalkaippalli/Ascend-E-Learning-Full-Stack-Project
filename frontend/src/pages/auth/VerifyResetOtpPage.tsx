import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

import { verifyResetOtp } from '../../services/auth/authService'
import { verifyOtpSchema } from '../../schemas/authSchema'

function VerifyResetOtpPage() {
  const location = useLocation()
  const navigate = useNavigate()

  const { email, message } = location.state || {}

  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!email) {
      
      navigate('/forgot-password', { replace: true })                                     // Prevent users from entering the reset flow without starting it from Forgot Password.
    }
  }, [email, navigate])

  if (!email) {
    return null
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setError('')

    const result = verifyOtpSchema.safeParse({
      email,
      otp,
    })

    if (!result.success) {
      setError(result.error.issues[0].message)
      return
    }

    setIsLoading(true)

    try {
      const response = await verifyResetOtp(result.data)

      console.log('Reset OTP verified:', response)

      // The reset token authorizes the next step without storing it in localStorage.
      navigate('/reset-password', {
        state: {
          resetToken: response.resetToken,
        },
      })
    } catch (error) {
      console.error('Reset OTP verification failed:', error)

      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.message || 'OTP verification failed',
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
            Verify your email
          </h1>

          {message && (
            <p className="mt-4 rounded-lg bg-accent-soft px-4 py-3 text-sm text-secondary">
              {message}
            </p>
          )}

          <p className="mt-3 text-sm text-muted">
            Enter the code sent to{' '}
            <span className="font-medium text-primary">{email}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="otp"
              className="mb-2 block text-sm font-medium text-primary"
            >
              Verification code
            </label>

            <input
              id="otp"
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={otp}
              onChange={(event) => {
                setOtp(event.target.value)
                setError('')
              }}
              placeholder="Enter 6-digit code"
              className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-primary outline-none transition focus:border-accent"
            />

            {error && (
              <p className="mt-2 text-sm text-error">
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-primary px-4 py-3 font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? 'Verifying...' : 'Verify code'}
          </button>
        </form>
      </div>
    </main>
  )
}

export default VerifyResetOtpPage

