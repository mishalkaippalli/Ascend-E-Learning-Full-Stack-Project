import { useState } from 'react'
import axios from 'axios'
import { signup } from '../../services/authService'
import { signupSchema } from '../../schemas/authSchema'


function SignupPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [errors, setErrors] = useState<{
    name?: string
    email?: string
    password?: string
  }>({})

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

      console.log('Signup successful:', response)
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log(error.response?.data)
        } else {
            console.error('Unexpected error:', error)
        }
      }
    }

  return (
    <div>
      <h1>Create your Ascend account</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(event) => {
            setName(event.target.value)

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