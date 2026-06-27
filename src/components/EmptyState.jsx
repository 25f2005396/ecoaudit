function EmptyState({
  title = "Nothing here yet",
  message = "No data available yet.",
  icon = "📭",
}) {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <div className="text-5xl mb-4">{icon}</div>

      <h3 className="text-lg font-semibold text-gray-700">
        {title}
      </h3>

      <p className="text-gray-500 mt-2 max-w-sm">
        {message}
      </p>
    </div>
  );
}

export default EmptyState;