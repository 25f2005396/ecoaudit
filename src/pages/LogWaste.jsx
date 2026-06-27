import WasteForm from "../components/WasteForm";

function LogWaste() {
  return (
    <div>
      {/* Hero Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Log Waste Report
        </h1>
        <p className="text-gray-500 mt-2">
          Help us improve waste management by submitting a new waste report.
        </p>
      </div>

      {/* Form Container Wrapper */}
      <div className="max-w-2xl mx-auto">
        <WasteForm />
      </div>
    </div>
  );
}

export default LogWaste;