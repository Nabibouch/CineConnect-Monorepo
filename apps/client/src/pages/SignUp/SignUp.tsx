import { SignUpForm } from "./components/signupform"

export function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">

        {/* LEFT - FORMULAIRE */}
        <div className="p-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create account</h1>
          <p className="text-gray-500 text-sm mb-8">Sign up to continue</p>

          <SignUpForm />
        </div>

        {/* RIGHT - BRAND PANEL */}
        <div className="hidden md:flex items-center justify-center bg-slayer p-8">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30 mb-6">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h2 className="text-5xl font-bold text-white mb-3">Movie<span className="text-red-500">Tune</span></h2>
            <p className="text-red-100 text-sm leading-relaxed max-w-xs mx-auto">
              Rejoignez notre communauté et connectez-vous en toute sécurité
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}