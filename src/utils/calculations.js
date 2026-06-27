// Calculate total weight for each category
export function calcTotalByCategory(wasteLogs) {
  if (!Array.isArray(wasteLogs)) return {};

  return wasteLogs.reduce((acc, log) => {
    const category = log.category || "Unknown";
    const weight = log.weight ?? 0;

    acc[category] = (acc[category] || 0) + weight;

    return acc;
  }, {});
}

// Calculate grand total weight
export function calcGrandTotal(wasteLogs) {
  if (!Array.isArray(wasteLogs)) return 0;

  return wasteLogs.reduce(
    (acc, log) => acc + (log.weight ?? 0),
    0
  );
}

// Calculate number of logs per category
export function calcCountByCategory(wasteLogs) {
  if (!Array.isArray(wasteLogs)) return {};

  return wasteLogs.reduce((acc, log) => {
    const category = log.category || "Unknown";

    acc[category] = (acc[category] || 0) + 1;

    return acc;
  }, {});
}