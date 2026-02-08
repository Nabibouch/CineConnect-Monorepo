import { createFileRoute, Link, useNavigate } from "@tanstack/react-router"
import { useState } from "react"

export const Route = createFileRoute("/signin")({
  component: SignInPage,
})

function SignInPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

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

    setIsLoading(true)

    try {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/users/signin`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }
  )

      if (response.ok) {
        setSuccessMessage("Connexion réussie ! Redirection...")
        setTimeout(() => {
          navigate({ to: "/" })
        }, 1500)
      } else {
        const errorData = await response.json()
        setErrors({
          submit: errorData.message || "Erreur lors de la connexion"
        })
      }
    } catch (error) {
      console.error("Erreur:", error)
      setErrors({
        submit: "Erreur lors de la connexion. Vérifiez votre connexion."
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">

        {/* LEFT - FORMULAIRE */}
        <div className="p-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign in</h1>
          <p className="text-gray-500 text-sm mb-8">Welcome back</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* EMAIL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (errors.email) {
                    setErrors({ ...errors, email: "" })
                  }
                }}
                placeholder="m@example.com"
                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <span>⚠</span> {errors.email}
                </p>
              )}
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  if (errors.password) {
                    setErrors({ ...errors, password: "" })
                  }
                }}
                placeholder="••••••••"
                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <span>⚠</span> {errors.password}
                </p>
              )}
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gray-900 hover:bg-gray-800 disabled:bg-gray-600 text-white font-semibold py-2.5 rounded-lg transition duration-200 mt-6 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </button>

            {/* ERROR MESSAGE */}
            {errors.submit && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-start gap-2">
                <span className="text-lg">✕</span>
                <div>
                  <p className="font-semibold">Erreur lors de la connexion</p>
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

            {/* SIGN UP LINK */}
            <p className="text-center text-sm text-gray-600 pt-2">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-600 hover:text-blue-700 font-semibold transition">
                Sign up
              </Link>
            </p>
          </form>
        </div>

        {/* RIGHT - BRAND PANEL */}
        <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-red-500 to-red-900 p-8">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30 mb-6">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h2 className="text-5xl font-bold text-white mb-3">Cinneconnect</h2>
            <p className="text-red-100 text-sm leading-relaxed max-w-xs mx-auto">
              Rejoignez notre communauté et connectez-vous en toute sécurité
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}