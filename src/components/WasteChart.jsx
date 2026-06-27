import { Doughnut, Bar } from "react-chartjs-2";
import { calcTotalByCategory } from "../utils/calculations";
import { CATEGORY_COLORS } from "../constants/colors";
import { doughnutOptions, barOptions } from "../constants/chartOptions";
import "../utils/chartConfig";

function WasteChart({ wasteLogs = [] }) {
  if (wasteLogs.length === 0) return null;

  const totalByCategory = calcTotalByCategory(wasteLogs);
  const categories = Object.keys(totalByCategory);
  const weights = Object.values(totalByCategory);
  const colors = categories.map(
    (cat) => CATEGORY_COLORS[cat] || "#6B7280"
  );

  const doughnutData = {
    labels: categories,
    datasets: [
      {
        data: weights,
        backgroundColor: colors,
        borderWidth: 2,
        borderColor: "#ffffff",
      },
    ],
  };

  const barData = {
    labels: categories,
    datasets: [
      {
        label: "Weight (kg)",
        data: weights,
        backgroundColor: colors,
        borderRadius: 6,
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-6">
        📈 Waste Analytics
      </h2>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">

        {/* Doughnut Chart */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 text-center mb-4">
            Distribution by Category
          </h3>
          <div className="h-80">
            <Doughnut
              data={doughnutData}
              options={doughnutOptions}
            />
          </div>
        </div>

        {/* Bar Chart */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 text-center mb-4">
            Weight by Category (kg)
          </h3>
          <div className="h-80">
            <Bar
              data={barData}
              options={barOptions}
            />
          </div>
        </div>

      </div>
    </div>
  );
}

export default WasteChart;