import { useEffect, useState } from "react";
import { getWasteLogs } from "../services/firestoreService";
import TotalStats from "../components/TotalStats";
import WasteLogCard from "../components/WasteLogCard";

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
    return (
      <p className="text-center text-gray-500 mt-10">
        Loading waste logs...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-500 mt-10">
        ❌ {error}
      </p>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-green-600 mb-6">
        🌍 EcoAudit Dashboard
      </h1>

      {/* Stats */}
      {totalLogs > 0 && (
        <TotalStats wasteLogs={wasteLogs} />
      )}

      {/* Logs Feed */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          📋 Waste Logs
        </h2>

        {totalLogs === 0 ? (
          <p className="text-gray-400 text-center py-8">
            No waste logs yet. Be the first to log waste!
          </p>
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