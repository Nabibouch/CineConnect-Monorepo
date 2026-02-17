import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { useNavigate, Link } from "@tanstack/react-router"
import { FormInput } from "./forminput"
import { FormButton } from "../boutton/formbutton"

interface SignInData {
  email: string
  password: string
}

export function SignInForm() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [successMessage, setSuccessMessage] = useState("")

  const signInMutation = useMutation({
    mutationFn: async (data: SignInData) => {
      console.log("VITE_API_URL:", import.meta.env.VITE_API_URL)
      console.log("Sending data:", data)
      console.log("Stringified:", JSON.stringify(data))
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/signin`,
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
        let errorMessage = "Erreur lors de la connexion"
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

      try {
        const userData = JSON.parse(responseText)
        if (userData.token) {
          localStorage.setItem("authToken", userData.token)
        }
      } catch (e) {
        // Pas de données à parser
      }
    },
    onSuccess: () => {
      setSuccessMessage("Connexion réussie ! Redirection...")
      setTimeout(() => {
        navigate({ to: "/" })
      }, 1500)
    },
    onError: (error) => {
      setErrors({
        submit: error.message || "Erreur lors de la connexion. Vérifiez vos identifiants.",
      })
    },
  })

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

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

    console.log({ email, password })
    signInMutation.mutate({ email, password })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
      <FormButton isLoading={signInMutation.isPending} loadingText="Signing in...">
        Sign in
      </FormButton>

      {/* ERROR MESSAGE */}
      {errors.submit && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-red-500 font-bold text-lg">✕</span>
            <h3 className="text-red-800 font-semibold text-sm">
              Erreur lors de la connexion
            </h3>
          </div>
          <p className="text-red-600 text-sm ml-6">{errors.submit}</p>
        </div>
      )}

      {/* SUCCESS MESSAGE */}
      {successMessage && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
          <span className="text-green-500 font-bold text-lg">✓</span>
          <p className="text-green-700 text-sm">{successMessage}</p>
        </div>
      )}

      {/* SIGN UP LINK */}
      <p className="text-center text-sm text-gray-500">
        Don't have an account?{" "}
        <Link
          to="/signup"
          className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
        >
          Sign up
        </Link>
      </p>
    </form>
  )
}