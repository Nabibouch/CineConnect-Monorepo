import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { useNavigate, Link } from "@tanstack/react-router"
import { FormInput } from "../../../components/form/forminput"
import { FormButton } from "../../../components/boutton/formbutton"

interface SignUpData {
  username: string
  email: string
  password: string
}

interface SignUpError {
  message: string
}

export function SignUpForm() {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [successMessage, setSuccessMessage] = useState("")

  const signUpMutation = useMutation<void, SignUpError, SignUpData>({
    mutationFn: async (data: SignUpData) => {
      console.log("VITE_API_URL:", import.meta.env.VITE_API_URL)
      console.log("Sending data:", data)
      console.log("Stringified:", JSON.stringify(data))

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      )

      console.log("Response status:", response.status)
      console.log("Response headers:", response.headers)

      const responseText = await response.text()
      console.log("Response body (raw):", responseText)

      if (!response.ok) {
        let errorMessage = "Erreur lors de l'inscription"
        try {
          const errorData = JSON.parse(responseText)
          console.log("Error data parsed:", errorData)
          errorMessage = errorData.message || errorMessage
        } catch (e) {
          console.log("Could not parse error JSON, raw text:", responseText)
          errorMessage = responseText || errorMessage
        }
        throw new Error(errorMessage)
      }
    },
    onSuccess: () => {
      setSuccessMessage("Inscription réussie ! Redirection...")
      setTimeout(() => {
        navigate({ to: "/signin" })
      }, 1500)
    },
    onError: (error) => {
      setErrors({
        submit:
          error.message ||
          "Erreur lors de l'inscription. Vérifiez votre connexion.",
      })
    },
  })

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!username.trim()) {
      newErrors.username = "Username required"
    }

    if (!email.trim()) {
      newErrors.email = "Email required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email"
    }

    if (!password) {
      newErrors.password = "Password required"
    } else if (password.length < 6) {
      newErrors.password = "Minimum 6 characters"
    }

    return newErrors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    setSuccessMessage("")

    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    console.log({ username, email, password })
    signUpMutation.mutate({ username, email, password })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* USERNAME */}
      <FormInput
        label="Username"
        id="username"
        type="text"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value)
          if (errors.username) {
            setErrors({ ...errors, username: "" })
          }
        }}
        placeholder="Enter your username"
        error={errors.username}
      />

      {/* EMAIL */}
      <FormInput
        label="Email"
        id="email"
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value)
          if (errors.email) {
            setErrors({ ...errors, email: "" })
          }
        }}
        placeholder="m@example.com"
        error={errors.email}
      />

      {/* PASSWORD */}
      <FormInput
        label="Password"
        id="password"
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value)
          if (errors.password) {
            setErrors({ ...errors, password: "" })
          }
        }}
        placeholder="••••••••"
        error={errors.password}
      />

      {/* SUBMIT BUTTON */}
      <FormButton isLoading={signUpMutation.isPending} loadingText="Signing up...">
        Sign up
      </FormButton>

      {/* ERROR MESSAGE */}
      {errors.submit && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-start gap-2">
          <span className="text-lg">✕</span>
          <div>
            <p className="font-semibold">Erreur lors de l'inscription</p>
            <p className="text-xs mt-1">{errors.submit}</p>
          </div>
        </div>
      )}

      {/* SUCCESS MESSAGE */}
      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm flex items-start gap-2">
          <span className="text-lg">✓</span>
          <p>{successMessage}</p>
        </div>
      )}

      {/* SIGN IN LINK */}
      <p className="text-center text-sm text-gray-600 pt-2">
        Already have an account?{" "}
        <Link
          to="/signin"
          className="text-blue-600 hover:text-blue-700 font-semibold transition"
        >
          Sign in
        </Link>
      </p>
    </form>
  )
}