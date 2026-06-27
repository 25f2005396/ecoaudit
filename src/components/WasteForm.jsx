import { useState, useRef } from "react";
import useGeolocation from "../hooks/useGeolocation";
import { addWasteLog } from "../services/firestoreService";
import { WASTE_CATEGORIES } from "../constants/wasteCategories";

function WasteForm() {
  const [category, setCategory] = useState("");
  const [weight, setWeight] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const categoryRef = useRef(null);

  const { locationError, locationLoading, fetchLocation } = useGeolocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(false);

    // Validate before GPS
    const numericWeight = Number(weight);

    if (!category) {
      setSubmitError("Please select a category.");
      return;
    }

    if (isNaN(numericWeight) || numericWeight <= 0) {
      setSubmitError("Please enter a valid weight.");
      return;
    }

    setSubmitting(true);

    try {
      // Step 1: Get location
      const currentLocation = await fetchLocation();

      if (!currentLocation) {
        setSubmitError("Could not get your location. Please allow location access.");
        return;
      }

      // Step 2: Save to Firestore
      const result = await addWasteLog({
        category,
        weight,
        location: currentLocation,
        notes: notes.trim(),
      });

      if (result.success) {
        setSubmitSuccess(true);
        setCategory("");
        setWeight("");
        setNotes("");
        categoryRef.current?.focus();
      } else {
        setSubmitError(result.error);
      }
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-green-600 mb-6">
        Log Waste Entry
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Waste Category
          </label>
          <select
            ref={categoryRef}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Select a category</option>
            {WASTE_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Weight */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Weight (kg)
          </label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Enter weight in kg"
            min="0.1"
            step="0.1"
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Notes (optional)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any additional details..."
            rows={3}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Location Status */}
        {locationLoading && (
          <p className="text-sm text-blue-500">
            📍 Fetching your location...
          </p>
        )}
        {locationError && (
          <p className="text-sm text-red-500">
            ⚠️ {locationError}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {submitting ? "Submitting..." : "Log Waste Entry"}
        </button>

        {/* Success */}
        {submitSuccess && (
          <p className="text-sm text-green-600 font-medium text-center">
            ✅ Waste report submitted successfully.
          </p>
        )}

        {/* Error */}
        {submitError && (
          <p className="text-sm text-red-500 text-center">
            ❌ {submitError}
          </p>
        )}

      </form>
    </div>
  );
}

export default WasteForm;