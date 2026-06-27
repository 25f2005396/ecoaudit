function WasteLogCard({ log }) {
  const {
    category,
    weight,
    notes,
    location,
    createdAt,
  } = log;

  const formattedDate = createdAt?.toDate?.()?.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }) ?? "—";

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
      
      {/* Category + Weight */}
      <div className="flex items-center justify-between">
        <span className="font-semibold text-gray-800">
          {category}
        </span>
        <span className="text-green-600 font-bold">
          {Number(weight).toFixed(2)} kg
        </span>
      </div>

      {/* Location */}
      {location ? (
        <div className="text-xs text-gray-400 mt-1">
          📍 {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
        </div>
      ) : (
        <div className="text-xs text-gray-400 mt-1">
          📍 Location unavailable
        </div>
      )}

      {/* Notes */}
      {notes && (
        <p className="text-sm text-gray-500 mt-1">
          {notes}
        </p>
      )}

      {/* Date */}
      <div className="text-xs text-gray-400 mt-1">
        🕐 {formattedDate}
      </div>

    </div>
  );
}

export default WasteLogCard;