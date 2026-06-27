import { calcGrandTotal, calcTotalByCategory } from "../utils/calculations";
import { CATEGORY_COLORS } from "../constants/colors";

function TotalStats({ wasteLogs = [] }) {
  const grandTotal = calcGrandTotal(wasteLogs);
  const totalByCategory = calcTotalByCategory(wasteLogs);
  const totalReports = wasteLogs.length;

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        📊 Waste Summary
      </h2>

      {/* Grand Total */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
        <p className="text-sm text-green-600 font-medium">
          Total Waste Logged
        </p>
        <p className="text-3xl font-bold text-green-700">
          {grandTotal.toFixed(2)} kg
        </p>
        <p className="text-sm text-gray-500">
          {totalReports} report{totalReports !== 1 ? "s" : ""} submitted
        </p>
      </div>

      {/* Per Category */}
      {Object.keys(totalByCategory).length === 0 ? (
        <p className="text-gray-500 text-center">
          No waste data available yet.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {Object.entries(totalByCategory)
            .sort(([, a], [, b]) => b - a)
            .map(([category, total]) => (
              <div
                key={category}
                className="rounded-lg p-3 text-white"
                style={{
                  backgroundColor: CATEGORY_COLORS[category] || "#6B7280",
                }}
              >
                <p className="text-xs font-medium opacity-90">{category}</p>
                <p className="text-lg font-bold">{total.toFixed(2)} kg</p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default TotalStats;