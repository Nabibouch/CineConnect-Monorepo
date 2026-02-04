import { createFileRoute , Link } from "@tanstack/react-router"
import { useForm } from "@tanstack/react-form"
import { useMutation } from "@tanstack/react-query"
import  axios  from "axios"

export const Route = createFileRoute("/signin")({
  component: SignInPage,
})

function SignInPage() {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      console.log(value)
    },
  })

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 relative">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">

        {/* LEFT */}
        <div className="p-10">
          <h1 className="text-2xl font-semibold">Welcome back</h1>
          <p className="text-gray-500 mb-8">Login to your account</p>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              form.handleSubmit()
            }}
            className="space-y-5"
          >
            {/* EMAIL */}
            <form.Field
              name="email"
              validators={{
                onChange: ({ value }) =>
                  !value
                    ? "Email is required"
                    : !value.includes("@")
                    ? "Invalid email"
                    : undefined,
              }}
            >
              {(field) => (
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="m@example.com"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  />
                  {field.state.meta.errors && (
                    <p className="text-xs text-red-500 mt-1">
                      {field.state.meta.errors}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            {/* PASSWORD */}
            <form.Field
              name="password"
              validators={{
                onChange: ({ value }) =>
                  value.length < 6
                    ? "Password must be at least 6 characters"
                    : undefined,
              }}
            >
              {(field) => (
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  />
                  {field.state.meta.errors && (
                    <p className="text-xs text-red-500 mt-1">
                      {field.state.meta.errors}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            {/* SUBMIT */}
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900 transition"
            >
              Sign in
            </button>

            {/* DIVIDER */}
            <div className="flex items-center gap-4 text-gray-400 text-sm">
              <div className="flex-1 h-px bg-gray-200" />
              Or continue with
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* OAUTH */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="border rounded-md py-2 hover:bg-gray-50 transition"
              >
                Google
              </button>
              <button
                type="button"
                className="border rounded-md py-2 hover:bg-gray-50 transition"
              >
                Github
              </button>
            </div>

            {/* SIGN UP */}
            <p className="text-sm text-center text-black">
              Don&apos;t have an account?{" "}
              <Link 
              to= "/signup"
              className="font-bold">
                signup
              </Link>
            </p>
          </form>
        </div>

        {/* RIGHT */}
        <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-red-500 to-red-900">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-red-500 flex items-center justify-center">
              <span className="text-white text-2xl font-bold">◎</span>
            </div>
            <p className="text-white text-xl font-semibold">Cinneconect</p>
          </div>
        </div>

      </div>

      {/* FOOTER */}
      <p className="absolute bottom-6 text-xs text-gray-400">
        By clicking continue, you agree to our Terms of Service and Privacy Policy
      </p>
    </div>
  )
}
