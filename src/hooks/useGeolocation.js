import { useState } from "react";
import { getCurrentPosition } from "../utils/geolocation";

function useGeolocation() {
  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);

  const fetchLocation = async () => {
    setLocationLoading(true);
    setLocationError(null);

    try {
      const currentLocation = await getCurrentPosition();
      setLocation(currentLocation);
      return currentLocation;
    } catch (error) {
      setLocation(null);
      setLocationError(error.message);
      return null;
    } finally {
      setLocationLoading(false);
    }
  };

  return {
    location,
    locationError,
    locationLoading,
    fetchLocation,
  };
}

export default useGeolocation;