import { createFileRoute } from "@tanstack/react-router"
import { SignInForm } from "../components/form/signinform"

export const Route = createFileRoute("/signin")({
  component: SignInPage,
})

function SignInPage() {
  return (
    <div className="min-h-screen flex flex-row items-center justify-center m-4 ">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
    
    {/*left bar */}
    <div className="p-10">
    <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign in</h1>
    <p className="text-gray-500 text-sm mb-8">Welcome back</p>
    <SignInForm/>
    </div>

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
  )}