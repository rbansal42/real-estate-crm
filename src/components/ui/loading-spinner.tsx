export function LoadingSpinner({ className = "" }) {
  return (
    <div className={`animate-spin rounded-full border-2 border-primary border-t-transparent h-4 w-4 ${className}`} />
  )
} 