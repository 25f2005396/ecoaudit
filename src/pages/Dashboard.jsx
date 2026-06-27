import { useEffect, useState } from "react";
import { getWasteLogs } from "../services/firestoreService";
import TotalStats from "../components/TotalStats";
import WasteLogCard from "../components/WasteLogCard";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import MapView from "../components/MapView";

function Dashboard() {
  const [wasteLogs, setWasteLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchLogs() {
      try {
        const result = await getWasteLogs();
        if (result.success) {
          setWasteLogs(result.wasteLogs);
        } else {
          setError(result.error);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchLogs();
  }, []);

  const totalLogs = wasteLogs.length;

  if (loading) {
    return <LoadingSpinner message="Loading waste logs..." />;
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
        <p className="text-red-600 font-medium">
          ❌ {error}
        </p>
      </div>
    );
  }

  return (
    <div>

      {/* Hero Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          🌍 EcoAudit Dashboard
        </h1>
        <p className="text-gray-500 mt-2">
          Track and monitor community waste reports in one place.
        </p>
      </div>

      {/* Stats */}
      {totalLogs > 0 && (
        <TotalStats wasteLogs={wasteLogs} />
      )}

      {/* Map */}
      {totalLogs > 0 && (
        <MapView wasteLogs={wasteLogs} />
      )}

      {/* Logs Feed */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          📋 Waste Logs
        </h2>
        {totalLogs === 0 ? (
          <EmptyState
            title="No Waste Logs"
            message="Be the first to log waste!"
          />
        ) : (
          <div className="flex flex-col gap-3">
            {wasteLogs.map((log) => (
              <WasteLogCard key={log.id} log={log} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

export default Dashboard;