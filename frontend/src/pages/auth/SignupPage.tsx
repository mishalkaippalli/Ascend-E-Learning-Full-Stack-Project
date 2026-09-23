import { useState } from 'react'
import axios from 'axios'
import { signup } from '../../services/authService'
import { signupSchema } from '../../schemas/authSchema'
import { useNavigate } from 'react-router-dom'

function SignupPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [errors, setErrors] = useState<{
    name?: string
    email?: string
    password?: string
  }>({})

  const [serverError, setServerError] = useState('')

  const navigate = useNavigate()

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()

    const result = signupSchema.safeParse({
      name,
      email,
      password,
    })

    if (!result.success) {
      const fieldErrors: {
        name?: string
        email?: string
        password?: string
      } = {}

      result.error.issues.forEach((issue) => {
        const field = issue.path[0]

        if (
          field === 'name' ||
          field === 'email' ||
          field === 'password'
        ) {
          fieldErrors[field] = issue.message
        }
      })

      setErrors(fieldErrors)

      return
    }

    setErrors({})

    try {
      const response = await signup(result.data)

      navigate('/verify-otp', {                 // Navigate to the OTP page and temporarily pass the user's email.   // Router state keeps this temporary data out of the URL.                                             // Router state keeps this temporary data out of the URL.
        state: {
          email: response.email,
        },
      })

    } catch (error) {
      if (axios.isAxiosError(error)) {
        setServerError(
          error.response?.data?.message || 'Something went wrong',
        )
      } else {
        setServerError('Something went wrong')
      }
     }
    }

  return (
    <div>
      <h1>Create your Ascend account</h1>
      {serverError && <p>{serverError}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(event) => {
            setName(event.target.value)
            setServerError('')

            if (errors.name) {
                setErrors((previous) => ({
                ...previous,
                name: undefined,
                }))
            }
            }}
        />

        {errors.name && <p>{errors.name}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value)
            setServerError('')

            if (errors.email) {
                setErrors((previous) => ({
                ...previous,
                email: undefined,
                }))
            }
           }}
        />

        {errors.email && <p>{errors.email}</p>}

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value)

            if (errors.password) {
                setErrors((previous) => ({
                ...previous,
                password: undefined,
                }))
            }
          }}
        />

        {errors.password && <p>{errors.password}</p>}

        <button type="submit">Create Account</button>
      </form>
    </div>
  )
}

export default SignupPage