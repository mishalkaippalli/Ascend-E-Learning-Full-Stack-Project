import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { verifyEmailOtp } from '../../services/authService'
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

    useEffect(() => {
        
        if (!email) {
        navigate('/signup')                                               // If the page was opened without an email, return to signup.
        }
    }, [email, navigate])

    if (!email) {
        return null
    }

    return (
    <div>
        <h1>Verify your email</h1>

        <p>OTP sent to: {email}</p>

        <form onSubmit={handleSubmit}>
            <input
            type="text"
            value={otp}
            onChange={(event) => {
                setOtp(event.target.value)
                setError('')
                setServerError('')
            }}
            placeholder="Enter OTP"
            />

            {error && <p>{error}</p>} 

            {serverError && <p>{serverError}</p>}
            
            {successMessage && <p>{successMessage}</p>}

            <button type="submit" disabled={isLoading}>
                {isLoading ? 'Verifying...' : 'Verify OTP'}
            </button>
        </form>
    </div>
    )
}

export default VerifyOtpPage