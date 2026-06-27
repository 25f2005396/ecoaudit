import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "../utils/leafletConfig";

function MapView({ wasteLogs = [] }) {
  // Fix: use != null to allow latitude/longitude of 0 (Equator)
  const logsWithLocation = wasteLogs.filter(
    (log) =>
      log.location?.latitude != null &&
      log.location?.longitude != null
  );

  if (logsWithLocation.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          🗺️ Waste Map
        </h2>
        <p className="text-gray-400 text-center py-8">
          No location data available yet.
        </p>
      </div>
    );
  }

  // Center map on first log
  const center = [
    logsWithLocation[0].location.latitude,
    logsWithLocation[0].location.longitude,
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        🗺️ Waste Map
      </h2>
      <div className="rounded-lg overflow-hidden">
        <MapContainer
          center={center}
          zoom={13}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {logsWithLocation.map((log) => (
            <Marker
              key={log.id}
              position={[
                log.location.latitude,
                log.location.longitude,
              ]}
            >
              <Popup>
                <div>
                  <p className="font-semibold">{log.category}</p>
                  <p>{Number(log.weight).toFixed(2)} kg</p>
                  {log.notes && (
                    <p className="text-gray-500">{log.notes}</p>
                  )}
                  <p className="text-gray-400 text-xs mt-1">
                    {log.createdAt?.toDate?.()?.toLocaleString(undefined, {
                      dateStyle: "medium",
                      timeStyle: "short",
                    }) ?? "—"}
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

export default MapView;