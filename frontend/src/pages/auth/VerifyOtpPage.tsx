import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { verifyEmailOtp,
         resendEmailOtp,
 } from '../../services/auth/authService'
import { verifyOtpSchema } from '../../schemas/authSchema'
import axios from 'axios'

function VerifyOtpPage() {
 
  const location = useLocation()                                       // Reads temporary navigation state passed from SignupPage.

  const navigate = useNavigate()                                       // Allows navigation without clicking a Link.

  const email = location.state?.email
  
  const [otp, setOtp] = useState("")

  const [error, setError] = useState('')

  const [successMessage, setSuccessMessage] = useState('')

  const [serverError, setServerError] = useState('')                         // Stores errors returned by the backend during OTP verification.

  const [isLoading, setIsLoading] = useState(false)

  const [isResending, setIsResending] = useState(false)
  const [resendCooldown, setResendCooldown] = useState(0)
  const [resendMessage, setResendMessage] = useState('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!email) {
        return
    }

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

        const response = await verifyEmailOtp(result.data)
        setSuccessMessage(response.message)

        setTimeout(() => {
        navigate('/login', { replace: true })
        }, 2000)

    } catch (error) {
        if (axios.isAxiosError(error)) {
            setServerError(
            error.response?.data?.message || 'OTP verification failed',
            )
        } else {
            setServerError('Something went wrong')
        }
    } finally {
        setIsLoading(false)
    }
    }

    const handleResendOtp = async () => {
        if (!email || resendCooldown > 0 || isResending) {
            return
        }

        setIsResending(true)
        setResendMessage('')
        setServerError('')

        try {
            const response = await resendEmailOtp(email)

            setResendMessage(response.message)
            setResendCooldown(30)
        } catch (error) {
            if (axios.isAxiosError(error)) {
            setServerError(
                error.response?.data?.message || 'Unable to resend OTP',
            )
            } else {
            setServerError('Something went wrong')
            }
        } finally {
            setIsResending(false)
        }
    }

    useEffect(() => {
        
        if (!email) {
        navigate('/signup')                                               // If the page was opened without an email, return to signup.
        }
    }, [email, navigate])

    useEffect(() => {
        if (resendCooldown <= 0) {
            return
        }

        const timer = window.setInterval(() => {
            setResendCooldown((current) => current - 1)
        }, 1000)

        return () => {
            
            window.clearInterval(timer)                                        // Cleans up the interval when the countdown changes or the page unmounts.
        }
    }, [resendCooldown])

    if (!email) {
        return null
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

            <p className="mt-3 text-base text-secondary">
            We sent a 6-digit verification code to{' '}
            <span className="font-medium text-primary">
                {email}
            </span>
            </p>

            {serverError && (
            <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-error">
                {serverError}
            </p>
            )}

            {successMessage && (
            <p className="mt-4 rounded-lg bg-green-50 px-4 py-3 text-sm text-success">
                {successMessage}
            </p>
            )}
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
                setServerError('')
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
            {isLoading ? 'Verifying...' : 'Verify email'}
            </button>

            {resendMessage && (
            <p className="text-center text-sm text-success">
                {resendMessage}
            </p>
            )}

            <button
            type="button"
            onClick={handleResendOtp}
            disabled={isResending || resendCooldown > 0}
            className="w-full text-sm font-medium text-accent transition hover:underline disabled:cursor-not-allowed disabled:opacity-50"
            >
            {isResending
                ? 'Sending...'
                : resendCooldown > 0
                ? `Resend code in ${resendCooldown}s`
                : 'Resend verification code'}
            </button>
            
        </form>
        </div>
    </main>
    )

}

export default VerifyOtpPage