interface FormButtonProps {
  isLoading?: boolean
  loadingText?: string
  children: React.ReactNode
  disabled?: boolean
}

export function FormButton({
  isLoading = false,
  loadingText = "Loading...",
  children,
  disabled = false,
}: FormButtonProps) {
  return (
    <button
      type="submit"
      disabled={disabled || isLoading}
      className="w-full bg-gray-900 hover:bg-gray-800 disabled:bg-gray-600 text-white font-semibold py-2.5 rounded-lg transition duration-200 mt-6 flex items-center justify-center gap-2"
    >
      {isLoading && (
        <>
          <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          {loadingText}
        </>
      )}
      {!isLoading && children}
    </button>
  )
}



              