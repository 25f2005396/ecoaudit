function LoadingSpinner({ message = "Loading..." }) {
  return (
    <div
      className="flex flex-col items-center justify-center py-8"
      role="status"
      aria-label={message}
    >
      <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-3 text-sm text-gray-500">
        {message}
      </p>
    </div>
  );
}

export default LoadingSpinner;